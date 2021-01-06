let newsaccordion = document.getElementById('newsaccordion');

var xhr = new XMLHttpRequest();
var proxy_url = 'http://cors-anywhere.herokuapp.com/';
xhr.open('GET', `https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json`, true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        let newshtml = "";
        articles.forEach(function (element, index) {
            let news = `<div class="flip-card mx-2 my-2">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img src="${element.urlToImage}" class="card-img-top" alt="Sorry! Image is not avilable">
                                    <h5 class="card-title my-3" style="color: black;"><b>${element.title}</b></h5>
                                </div>
                                <div class="flip-card-back">
                                    <h5 class="card-title my-3" style="color: #d42a2a;"><b>${element.title}</b></h5>
                                    <p class="card-text">${element.content}</p>
                                    <div class="card-body my-3">
                                        <a href="${element.url}" target="_blank" style="background-color: #4BB543;
                                        color: white;
                                        padding: 15px 25px;
                                        text-align: center"; class="card-link">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
            newshtml += news;
        });

        newsaccordion.innerHTML = newshtml;
    }
}
xhr.send();

