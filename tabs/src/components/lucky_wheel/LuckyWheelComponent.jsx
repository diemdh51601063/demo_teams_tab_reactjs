import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../../assets/lucky_wheel/style.css";
import anh from "../../assets/images/anh.jpg";
import anh2 from "../../assets/images/anh2.jpg";


function LuckyWheelComponent() {
    const [listData, setListData] = useState([]);
    const [rotate, setRotate] = useState(0) // độ xoay
    const [result, setResult] = useState(null); // kết quả sau 1 lần xoay
    const [deg, setDeg] = useState(null);
    const [statusBtn, setStatusBtn] = useState("wheel-btn");
    const [reload, setReload] = useState(false);
    const [numberWin, setNumberWin] = useState(4);
    const [listCheckedItem, setListCheckedItem] = useState([
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

    const [transform, setTransform] = useState("");

    const [listResult, setListResult] = ([]);

    const [tmpVariable, setTmpVariable] = useState(1);

    const [randomInd, setRandomIndex] = useState();

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

    //hàm tạo ra vòng xoay, dựng từ canvas
    function renderWheel() {
        setRotate(0);
        var numOptions = listCheckedItem.length;
        var rotateDeg = 360 / numOptions / 2 + 90;
        var canvas = document.getElementById("wheel-canvas");
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var ctx = canvas.getContext("2d");
        let count = 0;
        for (var i = 0; i < numOptions; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.moveTo(0, 0);
            ctx.rotate((((360 / numOptions) * i - rotateDeg) * Math.PI) / 180);
            ctx.arc(0, 0, 250, 0, (2 * Math.PI) / numOptions, false);

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

    useEffect(() => {
        let random = randomIndex(listCheckedItem);
        console.log(random);
        renderWheel();
    })

    function renderItemWheel() {
        if (listCheckedItem !== null) {
            let turnNum = 1 / listCheckedItem.length;

            //Teams app auto debug = https (nếu dùng http thì sẽ bị lỗi)
            let urlSrc = "http://192.168.20.27/files/photo/";

            return (
                <>
                    {listCheckedItem.map((itemChecked, index) => {
                        return (
                            <li className="hc-luckywheel-item" key={"li_" + itemChecked.name} id={"li_" + index}>
                                <span style={{ "transform": "rotate(" + index * turnNum + "turn)" }}>
                                    <div id={"curve_" + index} className="div-item-luckywheel">
                                        <p className="text-normal"> {itemChecked.name}  </p>
                                    </div>
                                    {/* <img src={`https://i1-dulich.vnecdn.net/2021/05/18/VnExpress-MauSon-8-1621330133.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wUopIcNjmFPsr1P75uQ1Ew`} alt="img" /> */}

                                    {(index % 2 == 0 ?
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

    //hàm tính độ xoay sao cho phần tử được chọn 
    const fnGetPrize = (data_input) => {
        if (data_input[0] == null && !data_input[1] == null) {
            return;
        }
        let oldDeg = deg || 0;
        let newDeg = oldDeg + (360 - (oldDeg % 360)) + (360 * 3 - data_input[0] * (360 / listCheckedItem.length));
        setDeg(newDeg);
        return newDeg;
    };

    //hàm tạo ra vòng xoay, dựng từ canvas
    function renderWheel() {
        let numOptions = listCheckedItem.length;
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

    function spin() {
        let randNum = 0;
        let listCheckedItemLength = listCheckedItem.length;
        let rand = Math.floor(Math.random() * listCheckedItemLength);
        if (rand !== 0) {
            randNum = rand;
        }

        //let listResult = []
        if (listResult !== undefined) {
            let pos = listResult.findIndex(data => data.name === listCheckedItem[randNum].name);
            if (pos !== -1) {
                console.log("trùng");
                randNum = randomIndex(listCheckedItem);
            }
        }
        setRandomIndex(randNum);
        console.log(randomInd);

        //lúc gọi tạo randomIndex đang bị lặp rất nhiều lần, phải kiếm tra lại
    };

    function randomIndex() {
        let randNum = 0;
        let listCheckedItemLength = listCheckedItem.length;
        let rand = Math.floor(Math.random() * listCheckedItemLength);
        if (rand !== 0) {
            randNum = rand;
        }

        //let listResult = []
        if (listResult !== undefined) {
            let pos = listResult.findIndex(data => data.name === listCheckedItem[randNum].name);
            if (pos !== -1) {
                console.log("trùng");
                randNum = randomIndex(listCheckedItem);
            }
        }
        setRandomIndex(randNum);
        return randNum;
    };

    const abc = () => {
        setTmpVariable(tmpVariable+1)
        console.log(tmpVariable);
    }

    return (
        <>
            <div className="bg-wheel container-fluid" key="wheel">
                <div className="flex-box">
                    <div className="flex-box-center">
                        <div className="box-wheel">
                            <div className="hc-luckywheel" id="div-wheel">
                                <div id="div-wheel-container" className="hc-luckywheel-container">
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
                                <button id="btn_spin" key="btn_spin" className={statusBtn} href="#" onClick={spin}> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LuckyWheelComponent;