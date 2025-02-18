import { useEffect } from "react";
import { openSettingsModal } from "@n3/react-vision-panel";

function BVI() {
  // useEffect(() => {
  //   // Подключаем JS
  //   const script = document.createElement("script");
  //   script.src = "/bvi/js/bvi.js";
  //   script.async = true;
  //   script.onload = () => {
  //     console.log("BVI script loaded", window.isvek);
  //   };
  //   script.onerror = () => {
  //     console.error("Failed to load BVI script");
  //   };
  //   document.body.appendChild(script);

  //   // Подключаем CSS вручную
  //   const link = document.createElement("link");
  //   link.rel = "stylesheet";
  //   link.href = "/bvi/css/bvi.css";
  //   document.head.appendChild(link);

  //   return () => {
  //     document.body.removeChild(script);
  //     document.head.removeChild(link);
  //   };
  // }, []);

  // const handleClick = () => {
  //   if (window.isvek) {
  //     new window.isvek.Bvi({
  //       target: "body",
  //       fontSize: 24,
  //       theme: "white",
  //       images: true,
  //       reload: true,
  //       lang: "ru-RU",
  //     });
  //     console.log("BVI initialized");
  //   } else {
  //     console.error("BVI script not loaded");
  //   }
  // };

	// openSettingsModal({
	// 	restoreButtonText: 'Обычная версия',
	// 	closeButtonText: 'Закрыть',
	// });

// 	useEffect(() => {
// 		// Динамически подключаем внешний скрипт
// 		const script1 = document.createElement('script');
// 		script1.src = 'https://lidrekon.ru/slep/js/jquery.js';
// 		script1.async = true;
// 		document.body.appendChild(script1);

// 		const script2 = document.createElement('script');
// 		script2.src = 'https://lidrekon.ru/slep/js/uhpv-full.min.js';
// 		script2.async = true;
// 		document.body.appendChild(script2);

// 		// Очистка при размонтировании компонента
// 		return () => {
// 				document.body.removeChild(script1);
// 				document.body.removeChild(script2);
// 		};
// }, []); // Это будет выполнено только один раз при монтировании компонента

  return (
      // <img id="specialButton" src="/images/bvi.png" alt="Версия для слабовидящих" onClick={null} />
      <img id="specialBsdgsgdutton" src="/images/bvi.png" alt="Версия для слабовидящих" onClick={null} />
  );
}

export default BVI;
