import { onMounted, ref, watch } from 'vue';
import type { Rect } from './utils';
import Utils from './utils';

export default function useCanvas(props, { emit }) {
  const { width, height, options, shapes } = props;
  const canvasRef = ref<HTMLCanvasElement>();
  let ctx: CanvasRenderingContext2D;
  let fontZoom = options.scale || 1; // 原缩放值
  let curZoom = options.scale || 1; // 现缩放值
  let translateX = options.translateX || 0; // 坐标原点的X变换值
  let translateY = options.translateY || 0; // 坐标原点的Y变换值
  let dragble = false; // 是否处于拖拽中
  let curPos = { x: 0, y: 0 }; // 当前鼠标位置（这里是相对于画布的，相对于其他也可以）
  let minZoom = 0.2; // 加最小值判断防止负值反向
  let maxZoom = 16;
  let visibleBoundingRect: Rect | null = null; // 可视区 // Partial<Rect>，todo...

  onMounted(async () => {
    const canvas = canvasRef.value!;
    ctx = canvas.getContext('2d')!;

    const shapesBoundingRect = await getShapesBoundingRect();
    if (options.fit && shapesBoundingRect) {
      const { x1, x2, y1, y2 } = (visibleBoundingRect = shapesBoundingRect);
      const widthRatio = width / (x2 - x1);
      const heightRatio = height / (y2 - y1);
      switch (options.fit) {
        case 'contain':
          curZoom = fontZoom = minZoom = Math.min(widthRatio, heightRatio);
          break;
        case 'cover':
          curZoom = fontZoom = minZoom = Math.max(widthRatio, heightRatio);
          break;
        default:
        // ...
      }
      translateX = width / 2 - ((x2 + x1) / 2) * curZoom;
      translateY = height / 2 - ((y2 + y1) / 2) * curZoom;
    }

    draw();
  });

  watch(
    () => props.shapes,
    () => {
      draw();
    },
    {
      deep: true,
    },
  );

  const transform = () => {
    ctx.translate(translateX, translateY);
    ctx.scale(curZoom, curZoom);
  };

  /** 绘制图像 */
  const draw = async () => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    transform();
    for (let i = 0; i < shapes.length; i++) {
      const { type, fixed, options, ...shapeOptions } = shapes[i];
      if (fixed) {
        ctx.restore();
      }
      ctx.save();
      if (options) {
        const { fillStyle, font, textAlign, textBaseline } = options;
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
        }
        if (font) {
          ctx.font = font;
        }
        if (textAlign) {
          ctx.textAlign = textAlign;
        }
        if (textBaseline) {
          ctx.textBaseline = textBaseline;
        }
      }
      switch (type) {
        case 'rect':
          drawRect(shapeOptions);
          break;
        case 'text':
          drawText(shapeOptions);
          break;
        case 'image':
          await drawImage(shapeOptions);
          break;
        default:
          console.error('Unrecognized shape type');
      }
      ctx.restore();
      if (fixed) {
        ctx.save();
        transform();
      }
    }
    ctx.restore();
  };

  const drawRect = (rectOptions) => {
    const { x, y, width, height } = rectOptions;
    ctx.fillRect(x, y, width, height);
  };

  const drawText = (textOptions) => {
    const { text, x, y, maxWidth } = textOptions;
    ctx.fillText(text, x, y, maxWidth);
  };

  const drawImage = async (imageOptions) => {
    const { image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = await Utils.getAvailableImageOptions(
      imageOptions,
    );
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  };

  /** 获取图像的边界矩形 */
  const getShapesBoundingRect = async () => {
    let shapesBoundingRect: Rect | null = null;
    for (let i = 0; i < shapes.length; i++) {
      const { type: shapeType, fixed, ...shapeOptions } = shapes[i];
      if (fixed) {
        continue;
      }
      switch (shapeType) {
        case 'rect':
          shapesBoundingRect = Utils.updateShapesBoundingRect(shapesBoundingRect, {
            x1: shapeOptions.x,
            x2: shapeOptions.x + shapeOptions.width,
            y1: shapeOptions.y,
            y2: shapeOptions.y + shapeOptions.height,
          });
          break;
        case 'text':
          const textBoundingRect = getTextBoundingRect(shapeOptions);
          shapesBoundingRect = Utils.updateShapesBoundingRect(shapesBoundingRect, textBoundingRect);
          break;
        case 'image':
          const { dx, dy, dWidth, dHeight } = await Utils.getAvailableImageOptions(shapeOptions);
          shapesBoundingRect = Utils.updateShapesBoundingRect(shapesBoundingRect, {
            x1: dx,
            y1: dy,
            x2: dx + dWidth,
            y2: dy + dHeight,
          });
          break;
        default:
          console.error('Unrecognized shape type');
      }
    }
    return shapesBoundingRect;
  };

  const getTextBoundingRect = (textOptions) => {
    const { text, x, y, maxWidth } = textOptions;
    const { width, actualBoundingBoxLeft, actualBoundingBoxRight, fontBoundingBoxAscent, fontBoundingBoxDescent } =
      ctx.measureText(text);
    const reducedWidth = width > maxWidth ? width - maxWidth : 0;
    return {
      x1: x - actualBoundingBoxLeft,
      x2: x + actualBoundingBoxRight - reducedWidth,
      y1: y - fontBoundingBoxAscent,
      y2: y + fontBoundingBoxDescent,
    };
  };

  /**
   * 缩放图像
   * @param {offsetX} 鼠标位置与画布左边的偏移量
   * @param {offsetY} 鼠标位置与画布上边的偏移量
   * @param {z} 增加的缩放值
   */
  const zoom = (offsetX, offsetY, z = 0) => {
    curZoom = z > 0 ? Math.min(fontZoom + z, maxZoom) : Math.max(fontZoom + z, minZoom);
    // 判断是否超出可视区了
    const newTranslateX = offsetX - ((offsetX - translateX) / fontZoom) * curZoom;
    const newTranslateY = offsetY - ((offsetY - translateY) / fontZoom) * curZoom;
    if (visibleBoundingRect) {
      const { x1, x2, y1, y2 } = visibleBoundingRect;
      const minTranslateX = Math.min(newTranslateX, -x1 * curZoom);
      const maxTranslateX = Math.max(newTranslateX, width - x2 * curZoom);
      const minTranslateY = Math.min(newTranslateY, -y1 * curZoom);
      const maxTranslateY = Math.max(newTranslateY, height - y2 * curZoom);
      if (newTranslateX !== minTranslateX) {
        translateX = minTranslateX;
      } else if (newTranslateX !== maxTranslateX) {
        translateX = maxTranslateX;
      } else {
        translateX = newTranslateX;
      }
      if (newTranslateY !== minTranslateY) {
        translateY = minTranslateY;
      } else if (newTranslateY !== maxTranslateY) {
        translateY = maxTranslateY;
      } else {
        translateY = newTranslateY;
      }
    } else {
      translateX = newTranslateX;
      translateY = newTranslateY;
    }
    draw();
    fontZoom = curZoom;
  };

  /**
   * 移动图像
   * @param {offsetX} 移动后的鼠标位置与画布左边的偏移量
   * @param {offsetY} 移动后的鼠标位置与画布上边的偏移量
   */
  const move = (offsetX, offsetY) => {
    const deltaX = offsetX - curPos.x;
    const deltaY = offsetY - curPos.y;
    curPos = { x: offsetX, y: offsetY };
    // 判断是否超出可视区了
    const newTranslateX = translateX + deltaX;
    const newTranslateY = translateY + deltaY;
    if (visibleBoundingRect) {
      const { x1, x2, y1, y2 } = visibleBoundingRect;
      // 向下移动，移动距离（-newTranslateY）不能小于图形上界与画布上界的距离（(y1 - 0) * curZoom），
      // 向上移动，移动距离（-newTranslateY）不能大于图形下界与画布上界的距离再减画布高度（(y2 - 0) * curZoom - height），
      // 计算 translateY 时用相反数计算，左右移动时同理。
      translateX = deltaX > 0 ? Math.min(newTranslateX, -x1 * curZoom) : Math.max(newTranslateX, width - x2 * curZoom);
      translateY = deltaY > 0 ? Math.min(newTranslateY, -y1 * curZoom) : Math.max(newTranslateY, height - y2 * curZoom);
    } else {
      translateX = newTranslateX;
      translateY = newTranslateY;
    }
    draw();
  };

  /**
   * 将鼠标位置与画布左边的偏移量转换为画布坐标值
   * @param {offsetX} 移动后的鼠标位置与画布左边的偏移量
   * @param {offsetY} 移动后的鼠标位置与画布上边的偏移量
   */
  const offsetToCanvas = ([offsetX, offsetY]) => {
    return [(offsetX - translateX) / curZoom, (offsetY - translateY) / curZoom];
  };

  const handleMouseWheel = (e) => {
    e.preventDefault();
    let z = e.deltaY > 0 ? -0.1 : 0.1;
    zoom(e.offsetX, e.offsetY, z);
  };

  // 鼠标按下
  const handleMouseDown = (e) => {
    dragble = true;
    curPos = { x: e.offsetX, y: e.offsetY };
  };

  // 鼠标弹起或离开
  const handleMouseUpOrOut = (e) => {
    dragble = false;
    curPos = { x: e.offsetX, y: e.offsetY };
  };

  // 鼠标移动
  const handleMouseMove = (e) => {
    if (dragble) {
      move(e.offsetX, e.offsetY);
    }
  };

  // 鼠标点击
  const handleClick = (e) => {
    const ponint = offsetToCanvas([e.offsetX, e.offsetY]);
    emit('click', ponint, e);
  };

  return {
    canvasRef,
    handleMouseWheel,
    handleMouseDown,
    handleMouseUpOrOut,
    handleMouseMove,
    handleClick,
  };
}
