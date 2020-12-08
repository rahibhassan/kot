import frappe
from datetime import date

def get_context(context):
    day = date.today()
    invoices = frappe.db.get_list("Sales Invoice", filters = {'fulfilled': 'No', 'posting_date': day})



    context.names = invoices
    context.hello = "hello"




# invoice_name = []
# for invoice in invoices:
#     invoice_name.append(invoice["name"])

# pl = []
# for k in invoice_name:
#     pl.append(frappe.db.get_list("Sales Invoice Item", filters = {'parent': k, 'item_group': 'Milkshake'}, fields=["item_name"]))
#res = [ele for ele in pl if ele != []] 