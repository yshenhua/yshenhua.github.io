export interface Rect {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const Utils = {
  /** 获取加载完成的图片 */
  async getCompletedImage(image) {
    if (image.complete) {
      return image;
    } else {
      return new Promise((resolve, reject) => {
        if (image.onload) {
          reject('This image has been onload');
        }
        image.onload = () => {
          resolve(this.getCompletedImage(image));
        };
      });
    }
  },

  /** 获取图片的绘制参数 */
  async getAvailableImageOptions(imageOptions) {
    const image = await this.getCompletedImage(imageOptions.image);
    const { naturalWidth, naturalHeight } = image;

    // 子区域
    const sx = Math.min(imageOptions.sx || 0, naturalWidth);
    const sWidth = Math.min(imageOptions.sWidth || naturalWidth, naturalWidth - sx);
    const sy = Math.min(imageOptions.sy || 0, naturalHeight);
    const sHeight = Math.min(imageOptions.sHeight || naturalHeight, naturalHeight - sy);

    // 画布
    const dx = imageOptions.dx || 0;
    const dy = imageOptions.dy || 0;
    const dWidth = imageOptions.dWidth || sWidth;
    const dHeight = imageOptions.dHeight || sHeight;

    return { image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight };
  },

  /** 更新图像的边界矩形坐标 */
  updateShapesBoundingRect(oldShapesBoundingRect: Rect | null, shapeBoundingRect: Rect): Rect {
    if (oldShapesBoundingRect) {
      return {
        x1: Math.min(oldShapesBoundingRect.x1, shapeBoundingRect.x1),
        x2: Math.max(oldShapesBoundingRect.x2, shapeBoundingRect.x2),
        y1: Math.min(oldShapesBoundingRect.y1, shapeBoundingRect.y1),
        y2: Math.max(oldShapesBoundingRect.y2, shapeBoundingRect.y2),
      };
    } else {
      return shapeBoundingRect;
    }
  },
};

export default Utils;
