const parquet = require('parquetjs-lite');
const path = require('path');

async function readParquet() {
  try {
    const filePath = path.join(__dirname, 'proj_d6f3ce72a49d85ad1b13ab25 (2).parquet'); // 替换成你的 Parquet 文件名
    const reader = await parquet.ParquetReader.openFile(filePath);

    const cursor = reader.getCursor();
    let record = null;

    while (record = await cursor.next()) {
      console.log(record);
    }

    await reader.close();
  } catch (err) {
    console.error(err);
  }
}

readParquet();
