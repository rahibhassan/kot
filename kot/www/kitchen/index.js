$(() => {

    frappe.require("assets/frappe/js/frappe/db.js")

    //Select all buttons for start and complete action
    buttons = document.querySelectorAll(".action");
    var reload_page;
    //Function to start timer for page refresh
    function start_timer(interval = 10000) {
        reload_page = setInterval(load_page, interval)
    }

    //Function to stop timer, so page wont refresh
    function end_timer() {
        clearInterval(reload_page)

    }
    start_timer(10000);

    function load_page() {
        location.reload();
    }


    const storage = {
        setItem: function (key, value) {
            return Promise.resolve().then(function () {
                localStorage.setItem(key, value);
            });
        },
        getItem: function (key) {
            return Promise.resolve().then(function () {
                return localStorage.getItem(key);
            });
        }
    };

    //Select all buttons and bind click action 
    //Click function should be based on data-actionType attribute
    //data-id attribute as the individual id
    buttons.forEach(element => {
        element.onclick = () => {

            type = element.getAttribute("data-actionType");
            id = element.getAttribute("data-id");


            if (type == "start") {

                //console.log("Mark " + id + "as started.")

                //Stop the timer, so page wont refresh mid of a request.
                end_timer();
                console.log("end")

                //Create the start time
                var d = new Date();
                var start_time = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                //console.log(start_time)
               
               
                frappe.db.set_value('POS Invoice', id, {
                    
                    'start_time': start_time,
                    
                })
                .then(res => {
                    console.log("set")
                })





                //Set start time to local storage. If in variable, data will be
                //lost in refresh/reload
                storage.setItem(id, start_time)
                    .then(function () {
                        //Hide start button
                        element.style.display = 'none';
                        //Show complete button
                        document.querySelector("." + id).style.display = 'block';
                        //As data saved, set timer back on.
                        start_timer();
                    })
                    // start_timer();


            } else if (type == "complete") {
                //Stop the timer, so page wont refresh mid of a request
                end_timer();

                var d = new Date();
                var end_time = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                //console.log(end_time)

                //Get end time from local storage. 
                let start_time = localStorage.getItem(id);
               
                //console.log(start_time)
                
                frappe.db.set_value('POS Invoice', id, {
                    'fulfilled': 'Yes',
                    //'start_time': start_time,
                    'end_time': end_time
                })
                .then(res => {
                    let doc = res.message;
                    console.log(doc + "jis");

                    element.style.display = 'none';
                    start_timer()
                    localStorage.removeItem(id)
                })

                console.log("fafil")


                   /*  .then(function () {
                        console.log(start_time)
                        frappe.db.set_value('Sales Invoice', id, {
                                'fulfilled': 'Yes',
                                'start_time': start_time,
                                'end_time': end_time
                            })
                            .then(res => {
                                let doc = res.message;
                                console.log(doc + "jis");

                                element.style.visibility = 'hidden';
                                start_timer()
                            })
                    }) */

            }
        }
    });
});