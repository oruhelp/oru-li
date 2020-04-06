
const getCompletedHtml = (_template, receipt) => {
  let _resultHtml = _template;
  _resultHtml = _resultHtml.replace(
    /__receipt.sender.name__/g,
    receipt.sender.name
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.sender.role__/g,
    receipt.sender.role
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.sender.phoneNumber__/g,
    receipt.sender.phoneNumber
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.sender.email__/g,
    receipt.sender.email
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.receiver.name__/g,
    receipt.receiver.name
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.receiver_phoneNumber__/g,
    receipt.receiver.phoneNumber
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.receiver.email__/g,
    receipt.receiver.email
  );
  _resultHtml = _resultHtml.replace(/__receipt.org.name__/g, receipt.org.name);
  _resultHtml = _resultHtml.replace(
    /__receipt.org.logoSrc__/g,
    receipt.org.logoSrc
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.addressLine1__/g,
    receipt.org.addressLine1
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.addressLine2__/g,
    receipt.org.addressLine2
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.countryAndPincode__/g,
    receipt.org.registeredCountry + ' ' + receipt.org.pincode
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.phoneNumber__/g,
    receipt.org.phoneNumber
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.email__/g,
    receipt.org.email
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.org.website__/g,
    receipt.org.website
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.donation.id__/g,
    receipt.donation.id
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.donation.amount__/g,
    receipt.donation.amount
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.donation.date__/g,
    receipt.donation.date
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.donation.description__/g,
    receipt.donation.description
  );
  _resultHtml = _resultHtml.replace(
    /__receipt.donation.footer__/g,
    receipt.donation.footer
  );
  return _resultHtml;
};

const template1 = `<!DOCTYPE html><html> <head> <title>Parcel Sandbox</title> <meta charset="UTF-8" /> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" /> <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous" ></script> <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous" ></script> <script> $("#printInvoice").click(function() { Popup($(".invoice")[0].outerHTML); function Popup(data) { window.print(); return true; } }); </script> <style> #invoice { padding: 30px; } .invoice { position: relative; background-color: #fff; min-height: 680px; padding: 15px; } .invoice header { padding: 10px 0; margin-bottom: 20px; border-bottom: 1px solid #3989c6; } .invoice .company-details { text-align: right; } .invoice .company-details .name { margin-top: 0; margin-bottom: 0; } .invoice .contacts { margin-bottom: 20px; } .invoice .invoice-to { text-align: left; } .invoice .invoice-to .to { margin-top: 0; margin-bottom: 0; } .invoice .invoice-details { text-align: right; } .invoice .invoice-details .invoice-id { margin-top: 0; color: #3989c6; } .invoice main { padding-bottom: 50px; } .invoice main .thanks { margin-top: -100px; font-size: 2em; margin-bottom: 50px; } .invoice main .notices { padding-left: 6px; border-left: 6px solid #3989c6; } .invoice main .notices .notice { font-size: 1.2em; } .invoice table { width: 100%; border-collapse: collapse; border-spacing: 0; margin-bottom: 20px; } .invoice table td, .invoice table th { padding: 15px; background: #eee; border-bottom: 1px solid #fff; } .invoice table th { white-space: nowrap; font-weight: 400; font-size: 16px; } .invoice table td h3 { margin: 0; font-weight: 400; color: #3989c6; font-size: 1.2em; } .invoice table .qty, .invoice table .total, .invoice table .unit { text-align: right; font-size: 1.2em; } .invoice table .no { color: #fff; font-size: 1.6em; background: #3989c6; } .invoice table .unit { background: #3989c6; } .invoice table .total { background: #3989c6; color: #fff; } .invoice table tbody tr:last-child td { border: none; } .invoice table tfoot td { background: 0 0; border-bottom: none; white-space: nowrap; text-align: right; padding: 10px 20px; font-size: 1.2em; border-top: 1px solid #aaa; } .invoice table tfoot tr:first-child td { border-top: none; } .invoice table tfoot tr:last-child td { color: #3989c6; font-size: 1.4em; border-top: 1px solid #3989c6; } .invoice table tfoot tr td:first-child { border: none; } .invoice footer { width: 100%; text-align: center; color: #777; border-top: 1px solid #aaa; padding: 8px 0; } @media print { .invoice { font-size: 11px !important; overflow: hidden !important; } .invoice footer { position: absolute; bottom: 10px; page-break-after: always; } .invoice > div:last-child { page-break-before: always; } } </style> </head> <body> <!--Author : @arboshiki--> <div id="invoice"> <div class="toolbar hidden-print"> <div class="text-right"> <button id="printInvoice" class="btn btn-info"> <i class="fa fa-print"></i> Print </button> <button class="btn btn-info"> <i class="fa fa-file-pdf-o"></i> Export as PDF </button> </div> <hr /> </div> <div class="invoice overflow-auto"> <div style="min-width: 600px"> <header> <div class="row"> <div class="col"> <a target="_blank" href="https://lobianijs.com"> <img width="150" src="__receipt.org.logoSrc__" data-holder-rendered="true" /> </a> </div> <div class="col company-details"> <h2 class="name"> <a target="_blank" href="__receipt.org.website__">__receipt.org.name__</a> </h2> <div>__receipt.org.addressLine1__</div> <div>__receipt.org.addressLine2__</div> <div>__receipt.org.countryAndPincode__</div> <div>__receipt.org.phoneNumber__</div> <div> <a href="mailto:__receipt.org.email__">__receipt.org.email__</a> </div> <a href="__receipt.org.website__">__receipt.org.website__</a> </div> </div> </header> <main> <div class="row contacts"> <div class="col invoice-to"> <div class="text-gray-light">RECEIPT TO:</div> <h2 class="to">__receipt.receiver.name__</h2> <div class="address">__receipt.receiver_phoneNumber__</div> <div class="email"> <a href="__receipt.receiver.email__">__receipt.receiver.email__</a> </div> </div> <div class="col invoice-details"> <h1 class="invoice-id">Receipt-__receipt.donation.id__</h1> <div class="date">Date of Invoice:__receipt.donation.date__</div> </div> </div> <table border="0" cellspacing="0" cellpadding="0"> <thead> <tr> <th>S.No</th> <th class="text-left">DESCRIPTION</th> <th class="text-right">TOTAL</th> </tr> </thead> <tbody> <tr> <td class="no">01</td> <td class="text-left"> <h3>__receipt.donation.description__</h3> </td> <td class="total">Rs.__receipt.donation.amount__.00</td> </tr> <tr> <td class="no">#</td> <td class="text-left"> <h3></h3> </td> <td class="total"></td> </tr> </tbody> <tfoot> <tr> <td colspan="1"></td> <td colspan="1">GRAND TOTAL</td> <td>Rs:__receipt.donation.amount__.00</td> </tr> </tfoot> </table> <div class="row contacts"> <div class="col invoice-to"> <div class="text-gray-light">RECEIPT FROM:</div> <h2 class="to">__receipt.sender.name__</h2> <div class="address">(__receipt.sender.role__)</div> <div class="address">__receipt.org.name__</div> <div class="address">__receipt.sender.phoneNumber__</div> <div class="email"> <a href="mailto:__receipt.sender.email__" >__receipt.sender.email__</a > </div> </div> </div> </main> <div class="thanks" id="receipt_footer"></div> <footer> __receipt.donation.footer__ </footer> </div> <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom--> <div></div> </div> </div> </body></html>`;

module.exports = {
    template1,
    getCompletedHtml
  }