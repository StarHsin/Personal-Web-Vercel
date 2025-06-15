import { motion, useAnimation } from "framer-motion"; // 導入 useAnimation

export default function TextAnimation({ text }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 調整每個字母出現的延遲時間
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2, // 每個字母出現的持續時間
      },
    },
  };

  const cursorVariants = {
    blink: {
      opacity: [0, 1, 1, 0], // 在 0 和 1 之間閃爍，停留在 1 的時間稍微長一點
      transition: {
        duration: 0.8, // 閃爍週期
        repeat: Infinity, // 無限重複
        repeatType: "loop", // 循環播放
      },
    },
  };

  const mainText = text.slice(0, -1);
  const cursor = text.slice(-1);

  // 創建一個 controls 物件來手動控制游標動畫
  const cursorControls = useAnimation();

  // 當文字動畫完成時觸發
  const handleTextAnimationComplete = () => {
    // 確保有游標才啟動動畫
    if (cursor) {
      // 啟動游標的閃爍動畫
      cursorControls.start("blink");
    }
  };

  return (
    <motion.div
      className="flex"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // 當 "visible" 動畫完成時，呼叫 handleTextAnimationComplete
      onAnimationComplete={() => handleTextAnimationComplete()}
    >
      {/* 渲染主要文字 */}
      {mainText.split("").map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* 渲染游標並應用閃爍動畫 */}
      <motion.span
        variants={cursorVariants}
        initial={{ opacity: 0 }} // 游標一開始是完全透明的
        animate={cursorControls} // 【關鍵改動】將 animate 指向 controls 物件
      >
        {cursor}
      </motion.span>
    </motion.div>
  );
}
