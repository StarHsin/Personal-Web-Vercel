import React from "react";
import * as FaIcons from "react-icons/fa"; // 導入所有 Fa 開頭的 icon

const AwardItem = ({ item }) => {
  // 根據 item.icon 字串動態取得對應的 icon 組件
  const IconComponent = item.icon ? FaIcons[item.icon] : null;

  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-700 last:border-b-0">
      <div className="flex-shrink-0 pt-1">
        {IconComponent && <IconComponent className="text-2xl text-sky-500" />}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="text-gray-300">{item.description}</p>
        <p className="text-gray-400 text-sm mt-1">年份: {item.year}</p>
      </div>
    </div>
  );
};

export default AwardItem;
