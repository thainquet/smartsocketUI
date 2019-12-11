const baseURL = "https://ss-tnq.herokuapp.com/"


function loadInfor() {
    document.getElementById('getData').innerHTML = `<button class="buttonload">
    <i class="fa fa-spinner fa-spin"></i> Loading
  </button>`
    let infor = baseURL + 'getInfor'
    fetch(infor)
        .then(
            response => {
                document.getElementById('getData').innerHTML = `<button type="button" class="btn btn-success" onclick="loadInfor()">
                                                                    Get information
                                                                </button>`
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json()
                .then(res => {
                    let stt = ''
                    if (res.trangthai == "1") stt = "On"
                    if (res.trangthai == "0") stt = "Off"
                    let temp = ``;
                    temp += `
                    <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-4 setCenter">
                        <h1>Temperature: ${res.nhietdo}°C</h1>
                    </div>
                    <div class="col-md-4 setCenter">
                        <h1>Humidity: ${res.doam}%</h1>
                    </div>
                    <div class="col-md-2"></div>
                    </div>                   
                    <br>
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <div>
                                <img src="http://bizweb.dktcdn.net/thumb/grande/100/289/100/products/n-kip-png.png?v=1527216519620"
                                    alt="home-image.img" style="width: 300px; height: 300px;">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="information setCenter">
                                <h1>Smart Socket</h1>
                                <h2>Status: ${stt}</h2>
                                <div id="changeBtn">
                                <button type="button" class="btn btn-info" onclick="changeCmd()">
                                    Change status
                                </button>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-2"></div>
                    </div>`
                    document.getElementById("dataReceive").innerHTML = temp;
                    localStorage.setItem("status", stt)
                    return temp;
                })
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function changeCmd() {
    document.getElementById('changeBtn').innerHTML = `<button class="buttonload">
    <i class="fa fa-spinner fa-spin"></i> Loading
  </button>`
    let cmdURL = ''
    let tt = localStorage.getItem("status")
    if (tt == "On") cmdURL = baseURL + "turnON"
    else cmdURL = baseURL + "turnOFF"
    // let cmdURL = baseURL + "turnOFF"
    // let turnOff = baseURL + "turnON"
    fetch(cmdURL)
    .then(res => {
        setTimeout(function(){location.reload()}, 2000)
    })
}