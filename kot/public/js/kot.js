// // frappe.provide('erpnext.PointOfSale');

// // frappe.pages['point-of-sale'].on_page_load=function() {
// //     console.log("ok")
// // }

// $(window).on('load', page_changed);



// function page_changed(event)
// {
//     frappe.after_ajax(function ()
//     {   
//         var route = frappe.get_route();
//         if(route[0] == "point-of-sale")
//         {
//             console.log("ok")
//         }
//     }
//     )
// }

// frappe.provide('erpnext.PointOfSale');

// frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
// 	frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: __('Point of Sale'),
// 		single_column: true
// 	});

//     console.log("Hello")
// }


// setTimeout(function () {
// 	console.log(frappe.get_route())	
// }, 5000);
var item_array = []
$(function () {


	let print_btn_class = ".invoice-summary-wrapper .print-btn";

	// $(.invoice-summary-wrapper .print-btn).click((e)=>{
	// 	e.preventDefault();
	// 	console.log("print initiated")
	// })

	$('#page-point-of-sale').click('.invoice-summary-wrapper .print-btn', (e) => {

		e.preventDefault();
		console.log("print initiated")
		let invoice = document.querySelector('.invoice-name')
		let invoice_id = invoice.textContent
		console.log(invoice_id)



		frappe.db.get_doc('POS Invoice', invoice_id)
			.then(doc => {
				console.log(doc.items)
				// item_array=[...item_array,{id:1,name:"fadil"}]

				doc.items.map((doc =>
					item_array = [...item_array, { Item_Name: doc.item_name, Item_Code: doc.item_code, Qty: doc.qty }]

					//console.log("Item Name:",doc.item_name,"Item Code:",doc.item_code,"Qty:",doc.qty)
				))
				console.log("item_array", item_array)
				array_post()
			})


		//ome
		var jqxhr = $.ajax("http://localhost:5000/print")
			.done(function () {
				console.log("success");
			})
			.fail(function () {
				console.log("error");
			})
			.always(function () {
				console.log("complete");
			});


		//two
		// var array=JSON.stringify(item_array)
		// $.ajax({
		// 	method: "POST",
		// 	url: "http://localhost:5000/print",
		// 	data: item_array,
		// 	contentType:'application/json;charset=UTF-8'
		//   })
		// 	.done(function( msg ) {
		// 	  console.log( "Data Saved: " + msg );
		// 	});
		var array_post=()=>{

			var settings = {
				"url": "http://localhost:5000/print",
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				"data": JSON.stringify({ "item_array": item_array }),
			};
	
			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}


		// console.log(e.target.innerText)

		//Ensure only click on li triggers adding data to td
		// if ($(e.target).is('.invoice-summary-wrapper .print-btn')) {
		// 	$("td.active").html(e.target.innerText)
		// }



	})
	
	let route = frappe.get_route();
	if (route[0] == "point-of-sale") {

		console.log("success")

		//ome
		// var jqxhr = $.ajax( "http//:localhost:5000/print" )
		// 	.done(function() {
		// 		console.log("success");
		// 	})
		// 	.fail(function() {
		// 		console.log("error");
		// 	})
		// 	.always(function() {
		// 		console.log("complete");
		// 	});


		// 	//two
		// 	var array=JSON.stringify(item_array)
		// 	$.ajax({
		// 		method: "POST",
		// 		url: "http://localhost:5000/print",
		// 		data: array,
		// 		contentType:'application/json;charset=UTF-8'
		// 	  })
		// 		.done(function( msg ) {
		// 		  console.log( "Data Saved: " + msg );
		// 		});



	}
});




