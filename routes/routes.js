
const prisma = require('../prisma');

app.get('/books', async (req, res) => {
    const books = await prisma.libro.findMany();
    res.json(books);
  });

app.get('/sales', async (req, res) => {
    const sales = await prisma.venta.findMany();
    res.json(sales);
  });
app.get('/books/:isbn', async (req, res) => {
    const book = await prisma.libro.findUnique({
        where: {
          isbn: '978-3-16-148410-1',
        },
      });
    res.json(book);
});
app.get('/books/:id', async (req, res) => {
    const sale = await prisma.ventas.findunique({
        where: {
            id_venta: '1'
        },
    });
    res.json(sale);
});
app.get('/books/author/:author', async (req, res) => {
    const author = await prisma.libros.findMany({
        where: {
            Autor: 'George Orwell'
        },
    })
    res.json(author);
});
app.get('/sales/book/:isbn', async (req, res) => {
    const totalventas = await prisma.ventas.findMany({
        where: {
            isbn: '978-3-16-148410-19'
        },
    });
    res.json(totalventas)
});
app.get('/books/price/:price', async (req, res) => {
    const totalventas = await prisma.libros.findMany({
        where: {
            Precio: {
                gt: 20
            }
        },
    });
    res.json(totalventas)
});
app.get('/sales/date/:date', async (req, res) => {
    const fecha = await prisma.ventas.findMany({
        where: {
            Fecha_Venta: new Date(4052023)
        },
    });
    res.json(fecha)
});
app.get('/books/with-sales', async (req, res) => {
    const librosConVentas = await prisma.libros.findMany({
        include: {
          Ventas: true,
        },
      });
      console.log(librosConVentas);
      
    res.json(librosConVentas)
});
app.get('/sales/top', async (req, res) => {
    const topBook = await prisma.venta.groupBy({
      by: ['ISBN'],
      _sum: { Cantidad: true },
      orderBy: { _sum: { Cantidad: 'desc' } },
      take: 1,
    });
    res.json(topBook);
  });
  

