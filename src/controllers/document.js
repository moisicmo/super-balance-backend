
const { UserSchema } = require('../models');
const pdfMake = require('pdfmake');
const path = require('path');

const generateDocument = async (student, comprobanteId, responsableId, detail, received, date, folderName) => {
  const responsable = await UserSchema.findById(responsableId)
  console.log('documento');
  const fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../assets/fonts/Poppins-Regular.woff2'),
      bold: path.join(__dirname, '../../assets/fonts/Poppins-Regular.woff2'),
      italics: path.join(__dirname, '../../assets/fonts/Poppins-Regular.woff2'),
      bolditalics: path.join(__dirname, '../../assets/fonts/Poppins-Regular.woff2')
    }
  };

  const printer = new pdfMake(fonts);

  const docDefinition = {
    content: [
      {
        table: {
          widths: ['*', '13%', '19%', '*'],
          body: [
            [
              { text: 'SUPER BALANCE', style: 'tableHeader' },
              '',
              { text: 'COMPROBANTE N°', style: 'tableComprobante', },
              comprobanteId
            ],
            [
              { text: 'FACULTAD DE INGENIERIA', style: 'tableHeader' },
              '',
              '',
              '',
            ],
            [
              { text: 'INGENIERIA DE SISTEMAS', style: 'tableHeader' },
              '',
              '',
              '',
            ],
            [
              { text: 'CENTRO DE ESTUDIANTES', style: 'tableHeader' },
              '',
              '',
              '',
            ]
          ],

        },
        layout: 'noBorders',
      },
      { text: '\n' },
      { text: 'COMPROBANTE DE PAGO', fontSize: 24, alignment: 'center' },
      { text: '\n' },
      {
        table: {
          widths: ['15%', '50%', '*', '*'],
          body: [
            [
              { text: 'Fecha:', style: 'tableTitle' },
              date,
              { text: 'Cod. Est.', style: 'tableComprobante', },
              `${student.code}`
            ],
            [
              { text: 'Nombre:', style: 'tableTitle' },
              `${student.name} ${student.lastName}`,
              '',
              '',
            ],
            [
              { text: 'Emitido por:', style: 'tableTitle' },
              `${responsable.name} ${responsable.lastName}`,
              '',
              '',
            ],
          ],

        },
        layout: 'noBorders',
      },
      { text: '\n' },
      {
        table: {
          widths: ['12%', '*', '20%', '15%'],
          body: [
            [
              { text: 'CANTIDAD', style: 'tableHeader' },
              { text: 'DESCRIPCION', style: 'tableHeader' },
              { text: 'PRECIO', style: 'tableHeader' },
              { text: 'SUBTOTAL', style: 'tableHeader' },
            ],
            ...detail.map(element => [
              `${element.cant}`,
              element.description,
              `${element.price}`,
              `${element.cant * element.price}`,
            ])

          ],
        },
      },
      {
        table: {
          widths: ['*', '36.8%'],
          body: [
            [
              { text: `Son: 00/100 Bolivianos`, style: 'tableTitle' },
              {
                table: {
                  widths: ['57.7%', '*'],
                  body: [
                    [
                      { text: 'TOTAL:', style: 'tableComprobante' },
                      `${detail.reduce((sum, element) => sum + (element.price * element.cant), 0)}`
                    ],
                    [
                      { text: 'IMPORTE RECIBIDO:', style: 'tableComprobante' },
                      `${received}`
                    ],
                    [
                      { text: 'IMPORTE DEVUELTO:', style: 'tableComprobante' },
                      `${received - (detail.reduce((sum, element) => sum + (element.price * element.cant), 0))}`
                    ]
                  ]
                }
              }
            ]
          ]
        },
        layout: 'noBorders',
      }
    ],
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 10,
        alignment: 'center'
      },
      tableTitle: {
        bold: true,
        fontSize: 10,
        alignment: 'left'
      },
      tableComprobante: {
        bold: true,
        fontSize: 10,
        alignment: 'right'
      }
    }
  };
  return new Promise((resolve, reject) => {
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];
    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    pdfDoc.on('end', async () => {

      const pdfData = Buffer.concat(chunks);
      const pdfStream = new Readable();
      pdfStream.push(pdfData);
      pdfStream.push(null);
      const pdfBase64 = pdfData.toString('base64');


      resolve({ pdfBase64, response });
    });
    pdfDoc.end();
  });
};


module.exports = generateDocument;
