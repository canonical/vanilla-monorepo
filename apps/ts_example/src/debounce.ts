function debounce<T extends (...args: any[]) => Promise<any>>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let promiseReject: ((reason?: any) => void) | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      if (promiseReject) {
        promiseReject('Debounced function call cancelled');
      }
    }

    return new Promise((resolve, reject) => {
      promiseReject = reject;
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export default debounce;

