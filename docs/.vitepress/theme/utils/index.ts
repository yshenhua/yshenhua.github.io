export const rewriteFilePath = (filePath: string) => filePath.replace(/_/g, '-');

interface InitAdsbygoogleProps {
  onSuccess?: VoidFunction;
  onFail?: VoidFunction;
}
const initAdsbygoogle = ({ onSuccess, onFail }: InitAdsbygoogleProps) => {
  const ins = document.querySelector('[data-ad-slot="1726013858"]');
  if (ins) {
    if (!ins.getAttribute('data-ad-status')) {
      const adsbygoogleJs = document.getElementById('adsbygoogle-js')!;
      adsbygoogleJs.onload = () => {
        (window as any).adsbygoogle?.push({});
      };
    }
    onSuccess?.();
  } else {
    onFail?.();
  }
};
export const initObserverAdsbygoogle = () => {
  initAdsbygoogle({
    onFail: () => {
      const app = document.getElementById('app')!;
      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            initAdsbygoogle({});
          }
        }
      });
      observer.observe(app, { childList: true, subtree: true });
    },
  });
};
