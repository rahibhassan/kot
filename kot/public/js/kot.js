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
	$('div.page-content').on('click', 'div.print-btn', function(e) {
		//$(e.currentTarget).unbind('click');
		console.log("1");
		console.log();
	// });
	// $('#page-point-of-sale').click('.invoice-summary-wrapper .print-btn', (e) => {

		// console.log("2")
		// console.log(e);
		// console.log($(e));

		
			console.log("Print button clicked.")
			let invoice = document.querySelector('.invoice-name')
			let invoice_id = invoice.textContent
			console.log(invoice_id)


			frappe.db.get_doc('POS Invoice', invoice_id)
			.then(doc => {
	
				let order_type=doc.order_type
				console.log(order_type)
				// item_array=[...item_array,{id:1,name:"fadil"}]
				item_array=[]
				doc.items.map((doc =>
					item_array = [...item_array, { order_type:order_type, invoice:invoice_id, Item_Name: doc.item_name, Item_Code: doc.item_code, Qty: doc.qty }]
					//console.log("Item Name:",doc.item_name,"Item Code:",doc.item_code,"Qty:",doc.qty)
				))
				
				array_post()
			})

		var array_post=()=>{

			var settings = {
				"url": "http://localhost:5000/print",
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				"data": JSON.stringify({ "item_array": item_array}),
			};
	
			$.ajax(settings).done(function (response) {
				console.log(response);
				// e.preventDefault();
				e.stopPropagation();
			});
		}
		



	})
	
	let route = frappe.get_route();
	if (route[0] == "point-of-sale") {

		console.log("success")


	}
});




