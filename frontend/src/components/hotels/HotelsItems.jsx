import React from "react";

export default function HotelsItems({item}) {

  // const url = `${process.env.REACT_APP_BACK_URL}/${item.files.url[0]}`
  const pics = JSON.parse(item.files);
  const picsUrl = `url(${process.env.REACT_APP_BACK_URL}${pics[0].url})`;
  // console.log('=========================', aaa)
  const picStyle = {
    backgroundImage: picsUrl,
    backgroundColor: '#ccc',
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  }

  return (
    <>
      <div className="hotels-item-wrap">
        <div className="hotels-item-pic" style={picStyle}></div>
        <div className="hotels-item-conteiner">
          <h2>{item.title}</h2>
          <div className="hotels-item-description">{item.description}</div>
          <button className="hotels-item-btn">Подробнее</button>
        </div>
      </div>
    </>
  );
}