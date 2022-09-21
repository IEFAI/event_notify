function isToday(date) {
    const today = new Date();
    if (today.toDateString() === date.toDateString()) {
        return true;
    }
    return false;
}

fetch('./events.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        const disp = document.getElementById('disp');

        // map data.events.Date to new Date
        data.events = data.events.map(event => {
            return {...event, Date: new Date(event.Date)}
        });

        // sort the data with Date
        data.events.sort((a, b) => {
            return a.Date - b.Date;
        });

        data.events.forEach(element => {
            console.log((new Date - element.Date) > 0)
        });

        // create a html with data
        const display = data.events.map(
            event => {
                return `
                <div class="event ${(new Date - event.Date) > 0 && !isToday(event.Date) ? 'completed' : ''} ">
                    ${(new Date - event.Date) > 0 && !isToday(event.Date) ?
                        `
                        <div class="check done">
                            <span class="material-icons">done</span>
                        </div>
                        `:
                        `
                        <div class="check"></div>
                        `
                    }
                    <div class="card" style="width: 1200px">
                        <div class="card-body">
                            <div class="title">
                                <h5 class="card-title">${event.title}</h5>
                                <p style="padding-top: 10px;">${event.date}</p>
                            </div>
                            <hr>
                            <p class="card-text">${event.description}</p>
                            <div class="text-center">
                                <a href="${event.link}" class="btn btn-outline-success btnfs">Link</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        console.log(display);
        disp.insertAdjacentHTML('afterbegin', display);
        let cmp = document.getElementsByClassName('completed');
        cmp[cmp.length - 1].id = 'today';
        window.location.hash = "#today";
    }
    );
