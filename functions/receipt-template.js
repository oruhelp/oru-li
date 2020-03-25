const template1 = '<!DOCTYPE html><html> <head> <title>Parcel Sandbox</title> <meta charset="UTF-8" /> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" /> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous" ></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous" ></script> <script> $("#printInvoice").click(function() { Popup($(".invoice")[0].outerHTML); function Popup(data) { window.print(); return true; } }); </script> <style> #invoice { padding: 30px; } .invoice { position: relative; background-color: #fff; min-height: 680px; padding: 15px; } .invoice header { padding: 10px 0; margin-bottom: 20px; border-bottom: 1px solid #3989c6; } .invoice .company-details { text-align: right; } .invoice .company-details .name { margin-top: 0; margin-bottom: 0; } .invoice .contacts { margin-bottom: 20px; } .invoice .invoice-to { text-align: left; } .invoice .invoice-to .to { margin-top: 0; margin-bottom: 0; } .invoice .invoice-details { text-align: right; } .invoice .invoice-details .invoice-id { margin-top: 0; color: #3989c6; } .invoice main { padding-bottom: 50px; } .invoice main .thanks { margin-top: -100px; font-size: 2em; margin-bottom: 50px; } .invoice main .notices { padding-left: 6px; border-left: 6px solid #3989c6; } .invoice main .notices .notice { font-size: 1.2em; } .invoice table { width: 100%; border-collapse: collapse; border-spacing: 0; margin-bottom: 20px; } .invoice table td, .invoice table th { padding: 15px; background: #eee; border-bottom: 1px solid #fff; } .invoice table th { white-space: nowrap; font-weight: 400; font-size: 16px; } .invoice table td h3 { margin: 0; font-weight: 400; color: #3989c6; font-size: 1.2em; } .invoice table .qty, .invoice table .total, .invoice table .unit { text-align: right; font-size: 1.2em; } .invoice table .no { color: #fff; font-size: 1.6em; background: #3989c6; } .invoice table .unit { background: #3989c6; } .invoice table .total { background: #3989c6; color: #fff; } .invoice table tbody tr:last-child td { border: none; } .invoice table tfoot td { background: 0 0; border-bottom: none; white-space: nowrap; text-align: right; padding: 10px 20px; font-size: 1.2em; border-top: 1px solid #aaa; } .invoice table tfoot tr:first-child td { border-top: none; } .invoice table tfoot tr:last-child td { color: #3989c6; font-size: 1.4em; border-top: 1px solid #3989c6; } .invoice table tfoot tr td:first-child { border: none; } .invoice footer { width: 100%; text-align: center; color: #777; border-top: 1px solid #aaa; padding: 8px 0; } @media print { .invoice { font-size: 11px !important; overflow: hidden !important; } .invoice footer { position: absolute; bottom: 10px; page-break-after: always; } .invoice > div:last-child { page-break-before: always; } } </style> </head> <body> <!--Author : @arboshiki--> <div id="invoice"> <div class="toolbar hidden-print"> <div class="text-right"> <button id="printInvoice" class="btn btn-info"> <i class="fa fa-print"></i> Print </button> <button class="btn btn-info"> <i class="fa fa-file-pdf-o"></i> Export as PDF </button> </div> <hr /> </div> <div class="invoice overflow-auto"> <div style="min-width: 600px"> <header> <div class="row"> <div class="col"> <a target="_blank" href="https://lobianijs.com"> <img src="http://lobianijs.com/lobiadmin/version/1.0/ajax/img/logo/lobiadmin-logo-text-64.png" data-holder-rendered="true" /> </a> </div> <div class="col company-details"> <h2 class="name"> <a target="_blank" id="receipt_org_name" > </a> </h2> <div id="receipt_org_addressLine1"></div> <div id="receipt_org_addressLine2"></div> <div id="receipt_org_countryAndPincode"> </div> <div id="receipt_org_phoneNumber"></div> <div> <a id="receipt_org_email" ></a > </div> <a id="receipt_org_website" ></a > </div> </div> </header> <main> <div class="row contacts"> <div class="col invoice-to"> <div class="text-gray-light">RECEIPT TO:</div> <h2 class="to" id="receipt_receiver_name"></h2> <div class="address" id="receipt_receiver_phoneNumber"> </div> <div class="email"> <a id="receipt_receiver_email" ></a > </div> </div> <div class="col invoice-details"> <h1 class="invoice-id" id="receipt_donation_id"> </h1> <div class="date" id="receipt_donation_date"> </div> </div> </div> <table border="0" cellspacing="0" cellpadding="0"> <thead> <tr> <th>S.No</th> <th class="text-left">DESCRIPTION</th> <th class="text-right">TOTAL</th> </tr> </thead> <tbody> <tr> <td class="no">01</td> <td class="text-left"> <h3 id="receipt_donation_description"> </h3> </td> <td class="total" id="receipt_donation_amount"></td> </tr> <tr> <td class="no">#</td> <td class="text-left"> <h3></h3> </td> <td class="total"></td> </tr> </tbody> <tfoot> <tr> <td colspan="1"></td> <td colspan="1">GRAND TOTAL</td> <td id="receipt_donation_totalAmount"></td> </tr> </tfoot> </table> <div class="row contacts"> <div class="col invoice-to"> <div class="text-gray-light">RECEIPT FROM:</div> <h2 class="to" id="receipt_sender_name"></h2> <div class="address" id="receipt_sender_role"></div> <div class="address" id="receipt_org"> </div> <div class="address" id="receipt_sender_phoneNumber"> </div> <div class="email"> <a id="receipt_sender_email" ></a > </div> </div> <div class="col invoice-details"> <div class="text-gray-light">APPROVED BY:</div> <h2 class="to" id="receipt_approver_name"></h2> <div class="address" id="receipt_approver_role"> </div> <div class="address" id="receipt_org"> </div> <div class="address" id="receipt_approver_phoneNumber"> </div> <div class="email"> <a id="receipt_approver_email" ></a > </div> </div> </div> </main> <div class="thanks" id="receipt_footer"></div> <footer id="receipt_donation_footer"> Invoice was created on a computer and is valid without the signature and seal. </footer> </div> <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom--> <div></div> </div> </div> </body> <script> var receipt = `___###input###___`; function test() { // sender $("#receipt_sender_name").text(receipt["sender"]["name"]); $("#receipt_sender_role").text(`(${receipt["sender"]["role"]})`); $("#receipt_org").text(receipt["org"]["name"]); $("#receipt_sender_phoneNumber").text(receipt["sender"]["phoneNumber"]); $("#receipt_sender_email").text(receipt["sender"]["email"]); $("#receipt_sender_email").attr( "href", `mailto:${receipt["sender"]["email"]}` ); // approver $("#receipt_approver_name").text(receipt["approver"]["name"]); $("#receipt_approver_role").text(`(${receipt["approver"]["role"]})`); $("#receipt_org").text(receipt["org"]["name"]); $("#receipt_approver_phoneNumber").text( receipt["approver"]["phoneNumber"] ); $("#receipt_approver_email").text(receipt["approver"]["email"]); $("#receipt_approver_email").attr( "href", `mailto:${receipt["approver"]["email"]}` ); // receiver $("#receipt_receiver_name").text(receipt["receiver"]["name"]); $("#receipt_receiver_phoneNumber").text( receipt["receiver"]["phoneNumber"] ); $("#receipt_receiver_email").text(receipt["receiver"]["email"]); $("#receipt_receiver_email").attr( "href", `mailto:${receipt["receiver"]["email"]}` ); // org $("#receipt_org_name").text(receipt["org"]["name"]); $("#receipt_org_name").attr("href", receipt["org"]["website"]); $("#receipt_org_addressLine1").text(receipt["org"]["addressLine1"]); $("#receipt_org_addressLine2").text(receipt["org"]["addressLine2"]); $("#receipt_org_countryAndPincode").text( receipt["org"]["countryAndPincode"] ); $("#receipt_org_phoneNumber").text(receipt["org"]["phoneNumber"]); $("#receipt_org_email").text(receipt["org"]["email"]); $("#receipt_org_email").attr("href", `mailto:${receipt["org"]["email"]}`); $("#receipt_org_website").text(receipt["org"]["website"]); $("#receipt_org_website").attr("href", receipt["org"]["website"]); // donation $("#receipt_donation_id").text(`Receipt-${receipt["donation"]["id"]}`); $("#receipt_donation_date").text(`Date of Invoice: ${receipt["donation"]["date"]}`); $("#receipt_donation_description").text( receipt["donation"]["description"] ); $("#receipt_donation_amount").text(`Rs.${receipt["donation"]["amount"]}.00`); $("#receipt_donation_totalAmount").text(`Rs.${receipt["donation"]["amount"]}.00`); $("#receipt_donation_footer").text(receipt["donation"]["footer"]); } test(); </script></html>';

module.exports = {
    template1
  }