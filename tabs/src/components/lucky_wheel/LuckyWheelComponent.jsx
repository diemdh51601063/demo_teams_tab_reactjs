import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../../assets/lucky_wheel/style.css";
import "../../assets/lucky_wheel/result-content.css";
import "../../assets/lucky_wheel/checkbox.css";
import anh from "../../assets/images/anh.jpg";
import anh2 from "../../assets/images/anh2.jpg";
import RenderFirework from "../../assets/firework.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from '@fortawesome/free-solid-svg-icons'


function LuckyWheelComponent() {
    const [listData, setListData] = useState([
        {
            key: 1,
            text: "Sếp",
            percentpage: 0,
            image: "t-okuda@plott.local.png",
            checked: true,
            name: "t-okuda"
        },
        {
            key: 2,
            text: "Đạt",
            percentpage: 0,
            image: "h-dat@plott.local.png",
            checked: false,
            name: "h-dat"
        },
        {
            key: 3,
            text: "Thiện",
            percentpage: 1,
            image: "n-thien@plott.local.png",
            checked: true,
            name: "n-thien"
        },
        {
            key: 4,
            text: "Tân",
            percentpage: 1,
            image: "t-tan@plott.local.PNG",
            checked: false,
            name: "t-tan"
        },
        {
            key: 5,
            text: "Diễm",
            percentpage: 1,
            image: "n-diem@plott.local.png",
            checked: true,
            name: "n-diem"
        },
        {
            key: 6,
            text: "Hiếu",
            percentpage: 0,
            image: "n-hieu@plott.local.PNG",
            checked: false,
            name: "n-hieu"
        },
        {
            key: 7,
            text: "Dự",
            percentpage: 0,
            image: "v-du@plott.local.jpg",
            checked: false,
            name: "v-du"
        },
        {
            key: 8,
            text: "Trí",
            percentpage: 0,
            image: "n-tri@plott.local.png",
            checked: true,
            name: "n-tri"
        },
        {
            key: 9,
            text: "Công",
            percentpage: 0,
            image: "l-cong@plott.local.png",
            checked: true,
            name: "l-cong"
        },
        {
            key: 10,
            text: "Thanh",
            percentpage: 0,
            image: "b-thanh@plott.local.jpg",
            checked: true,
            name: "b-thanh"
        },
        {
            key: 11,
            text: "N-Trường",
            percentpage: 0,
            image: "n-truong@plott.local.jpg",
            checked: true,
            name: "n-truong"
        },
        {
            key: 12,
            text: "Chị Vân",
            percentpage: 0,
            image: "l-van@plott.local.png",
            checked: true,
            name: "l-van"
        },
        {
            key: 13,
            text: "M-Trường",
            percentpage: 0,
            image: "m-truong@plott.local.PNG",
            checked: true,
            name: "m-truong"
        },
        {
            key: 14,
            text: "Thắng",
            percentpage: 0,
            image: "l-thang@plott.local.png",
            checked: true,
            name: "l-thang"
        },
        {
            key: 15,
            text: "Lâm",
            percentpage: 1,
            image: "t-lam@plott.local.png",
            checked: true,
            name: "t-lam"
        },
        {
            key: 16,
            text: "Nghiên",
            percentpage: 0,
            image: "n-nghien@plott.local.jpg",
            checked: true,
            name: "n-nghien"
        },
        {
            key: 17,
            text: "Dũng",
            percentpage: 0,
            image: "b-dung@plott.local.png",
            checked: true,
            name: "b-dung"
        }
    ]); //ds item được chọn)
    //const [rotate, setRotate] = useState(0) // độ xoay
    const [result, setResult] = useState(null); // kết quả sau 1 lần xoay
    const [deg, setDeg] = useState(null);
    const [statusBtn, setStatusBtn] = useState("wheel-btn");
    //const [reload, setReload] = useState(false);
    //const [numberWin, setNumberWin] = useState(4);
    const [listCheckedItem, setListCheckedItem] = useState([]); //ds item được chọn)

    const [transform, setTransform] = useState("rotate(0deg)");

    const [listResult, setListResult] = useState([]);

    const [isShowingListData, setIsShowingListData] = useState(true);

    const [isCheckAll, setIsCheckAll] = useState(false);

    const [displayListData, setDisplayListData] = useState("none");

    const [disabledCheckbox, setDisabledCheckbox] = useState("");

    function getColor(index) {
        const listColor = [
            "aqua",
            "springgreen",
            "violet",
            "yellow",
            "hotpink",
        ];
        var ind = 0;
        ind = index % listColor.length;
        return listColor[ind];
    }

    //useEffect(<function1 sẽ chạy sau khi file load xong >, <dependency => là 1 mảng bao gồm các biến mà function1 sẽ được render lại khi các biến đó thay đổi> => điều kiện render thì đọc tài liệu)
    useEffect(() => {
        renderWheel();
    }, [listCheckedItem])

    function renderWheel() {
        let numOptions = listCheckedItem.length;
        if (numOptions > 0) {
            var rotateDeg = 360 / numOptions / 2 + 90;
            var canvas = document.getElementById("wheel-canvas");
            let x = canvas.width / 2;
            let y = canvas.height / 2;

            var ctx = canvas.getContext("2d");

            let count = 0;
            for (var i = 0; i < numOptions; i++) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(x, y); // Center Point
                ctx.moveTo(0, 0);
                ctx.rotate((((360 / numOptions) * i - rotateDeg) * Math.PI) / 180);
                ctx.arc(0, 0, 250, 0, (2 * Math.PI) / numOptions, false); // Radius

                if (numOptions % 2 === 0) {
                    if (count % 2 === 0) {
                        ctx.fillStyle = "lime";
                    } else {
                        ctx.fillStyle = "#fb0775";
                    }
                } else {
                    ctx.fillStyle = getColor(i);
                }

                ctx.fill();
                ctx.lineWidth = 1;
                if (numOptions > 1) {
                    ctx.strokeStyle = "lightslategrey";
                    ctx.stroke();
                }

                ctx.restore();
                count++;
            }
        }
    }

    function randomIndex() {
        var randNum = 0;
        let listCheckedItemLength = listCheckedItem.length;
        let rand = Math.floor(Math.random() * listCheckedItemLength);
        if (rand !== 0) {
            randNum = rand;
        }

        if (listResult.length > 0) {
            let pos = listResult.findIndex(data => data.key === listCheckedItem[randNum].key);
            if (pos !== -1) {
                console.log("trùng");
                randNum = randomIndex();
            }
        }
        return randNum;
    };

    function fnGetPrize(randomInd) {
        if (randomInd == null) {
            return;
        }
        let oldDeg = deg || 0;
        let newDeg = oldDeg + (360 - (oldDeg % 360)) + (360 * 3 - randomInd * (360 / listCheckedItem.length));
        setDeg(newDeg)
        return newDeg;
    };

    function spin() {
        let randomInd = randomIndex();
        setStatusBtn("wheel-btn disabled-link");
        setDisabledCheckbox("disabled-checkbox");

        setTimeout(() => {
            RenderFirework();
            setResult(listCheckedItem[randomInd]);
            setListResult(prev => [...prev, listCheckedItem[randomInd]]);
            setStatusBtn("wheel-btn");
            setDisabledCheckbox("");
        }, 5500);

        let rotateWheel = fnGetPrize(randomInd);
        setTransform("rotate(" + rotateWheel + "deg)")

        //lừa => data chưa xuống kịp, listResult ở đây lúc nào cũng console ra mảng thiếu 1 phần tử
        console.log(listResult);
    };

    function showListData() {
        if (displayListData === "none") {
            setDisplayListData("block");
        } else {
            setDisplayListData("none");
        }
    }

    function setListChecked() {
        let updatedList = [];
        let ele = document.getElementsByName('chk');
        if (isCheckAll === false) {
            setDisplayListData("block");
            setIsShowingListData(true);
            setIsCheckAll(true);
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].type === 'checkbox') {
                    ele[i].checked = true;
                    updatedList = [...updatedList, listData[i]];
                }
            }
            setListCheckedItem(updatedList);
        } else {
            setIsShowingListData(false);
            setIsCheckAll(false);
            for (let j = 0; j < ele.length; j++) {
                if (ele[j].type === 'checkbox') {
                    ele[j].checked = false;
                    listCheckedItem[j].checked = false;
                }
            }
            setListCheckedItem([]);
            clearWheelCanvas();
        }
        resetWheel();
    }

    const setItemChecked = (e) => {
        var updatedList = [...listCheckedItem];
        var posItem;

        if (e.checked) {
            posItem = updatedList.findIndex(i => i.text === listData[e.id].text);
            listData[e.id].checked = true;
            if (posItem < 0) {
                updatedList = [...updatedList, listData[e.id]];
            }
        } else {
            var pos = listData.findIndex(j => j.text === e.value);
            listData[pos].checked = false;
            posItem = updatedList.findIndex(i => i.text === e.value);
            if (posItem >= 0) {
                updatedList.splice(posItem, 1);
            }
        }
        setListCheckedItem(updatedList);

        if (updatedList.length === listData.length) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }

        clearWheelCanvas();
        resetWheel();
    }

    function renderItemWheel() {
        if (listCheckedItem.length > 0) {
            let turnNum = 1 / listCheckedItem.length;

            //Teams app auto debug = https (nếu dùng http thì sẽ bị lỗi)
            //let urlSrc = "http://192.168.20.27/files/photo/";

            return (
                <>
                    {listCheckedItem.map((itemChecked, index) => {
                        return (
                            <li className="hc-luckywheel-item" key={"li_" + itemChecked.text} id={"li_" + index}>
                                <span style={{ "transform": "rotate(" + index * turnNum + "turn)" }}>
                                    <div id={"curve_" + index} className="div-item-luckywheel">
                                        <p className="text-normal"> {itemChecked.text}  </p>
                                    </div>
                                    {/* <img src={`https://i1-dulich.vnecdn.net/2021/05/18/VnExpress-MauSon-8-1621330133.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wUopIcNjmFPsr1P75uQ1Ew`} alt="img" /> */}

                                    {(index % 2 === 0 ?
                                        <img src={anh} alt="img" />
                                        : <img src={anh2} alt="img" />
                                    )}
                                </span>
                            </li>
                        )
                    })
                    }
                </>
            )
        }
    }

    const clearWheelCanvas = () => {
        var canvas = document.getElementById("wheel-canvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const resetWheel = () => {
        setResult(null);
        setListResult([]);
        document.getElementById("firework").innerHTML = "";
    }

    function renderListItem() {
        return (
            <>
                {listData.length > 0 ?
                    (<>
                        <div className="checkbox-member" >
                            <div className="check-all-flex-box" key="div_all">
                                <div className="check-all" >
                                    <input checked={isCheckAll} className={disabledCheckbox} key="all_chkbox" type="checkbox" id="checkbox_all" name="checkbox_all" value="all" onChange={setListChecked}  />
                                    <label style={{ fontSize: "20px" }}>Tất cả</label>
                                </div>
                                <div className="check-all-arrow" id="check-all-arrow" key="arrow_list" onClick={showListData} >
                                    {isShowingListData === false ? <>&#11167;</> : <>&#11165;</>}
                                </div>
                            </div>
                            <div className="list-item" style={{ display: displayListData }} key="div_list_item" id="style-scroll-list-item" >
                                {listData.map((item, key_index) => {
                                    return (
                                        <div className="item-of-list" key={"item_" + key_index}>
                                            <input type="checkbox" className={disabledCheckbox} key={"chkbox_item_" + key_index} id={key_index} name="chk" value={item.text} onChange={(e) => setItemChecked(e.target)} />
                                            <label className="checkbox-label" key={"label_chkbox_item_" + key_index}>{item.text}</label>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                    </>) : ""}
            </>
        )
    }

    return (
        <>
            <div className="bg-wheel container-fluid" key="wheel">
                <div className="flex-box">

                    <div className="checkbox-list">
                        <div className="checkbox-item">
                            {renderListItem()}
                        </div>
                    </div>

                    <div className="flex-box-center">
                        <div className="box-wheel">
                            <div className="hc-luckywheel" id="div-wheel">
                                <div id="div-wheel-container" className="hc-luckywheel-container" style={{ "transform": transform }}>
                                    <canvas className="hc-luckywheel-canvas"
                                        id="wheel-canvas"
                                        width="500"
                                        height="500"
                                        key="canvas_wheel"
                                    />
                                    <ul id="ul_wheel" key="ul_list" className="hc-luckywheel-list">
                                        {renderItemWheel()}
                                    </ul>
                                </div>
                                <button id="btn_spin" key="btn_spin" className={statusBtn} onClick={spin}> </button>
                            </div>
                        </div>
                    </div>

                    <div className="box-result" id="box-result-id">
                        <div id="firework" className="firework-container"></div>
                        {(result === null ?
                            "" :
                            (
                                <>
                                    <FontAwesomeIcon icon={faRotate} className="reload" onClick={resetWheel} />
                                    <div className="result-content" id="result-content">
                                        <div className="row flex-result">
                                            <h2 className="result-title">Kết Quả </h2>
                                        </div>

                                        <div className="display">
                                            <div>
                                                {result != null ?
                                                    <span id="readout">
                                                        WINNER: {"  "}
                                                        <span key="result" id="result" className="cssanimation sequence fadeInBottom" >{result.text}</span>
                                                    </span>
                                                    : ""}
                                            </div>
                                            <hr></hr>
                                            <div className="list-result">
                                                {listResult != null ?
                                                    listResult.map((data, key) => {
                                                        return (
                                                            <>
                                                                <p key={data.text + key} className="cssanimation sequence fadeInBottom">{data.text}</p>
                                                            </>
                                                        );
                                                    })
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default LuckyWheelComponent;