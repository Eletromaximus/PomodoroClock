import {useEffect, useRef} from 'react';


const useInterval = (callback:any, delay:number) => {

  const savedCallback = useRef<any|undefined>();


  useEffect(
      () => {
          savedCallback.current = callback;
      },
      [callback]
  );

  useEffect(
      () => {
          const handler = (...args:any) => savedCallback.current(...args );

          if (delay !== 0) {
              const id = setInterval(handler, delay);
              return() => clearInterval(id);
          }

      },
      [delay]
  );
}

export default useInterval;