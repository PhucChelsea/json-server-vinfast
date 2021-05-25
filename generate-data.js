const faker = require('faker');
const fs = require('fs');

//set locale to use VietNamese
faker.locale = 'vi';

//radom data
// console.log(faker.commerce.productName());

///

const randomNewList = (n) => {
  if (n <= 0) return [];
  const newList = [];
  Array.from(new Array(n)).forEach(() => {
    const news = {
      id: faker.datatype.number(),
      title: faker.name.title(),
      image: faker.image.imageUrl(),
      description: faker.lorem.text(),
    };
    newList.push(news);
  });
  return newList;
};
///

const radomModelList = (n) => {
  if (n <= 0) return [];
  const modelList = [];

  //loop and push model
  Array.from(new Array(n)).forEach(() => {
    const model = {
      id: faker.datatype.number(),
      name: faker.company.companyName(),
    };

    modelList.push(model);
  });

  return modelList;
};
//
const randomProductList = (modelList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];
  // random data
  for (const model of modelList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        model_name: model.name,
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
      };
      productList.push(product);
    });
  }

  return productList;
};
//
const randomVersionList = (productList, numberOfVersions) => {
  if (numberOfVersions <= 0) return [];
  const versionList = [];
  for (const product of productList) {
    Array.from(new Array(numberOfVersions)).forEach(() => {
      const version = {
        productId: product.id,
        id: faker.datatype.number(),
        name_version: faker.name.firstName(),
        price: Number.parseFloat(faker.commerce.price()),
        color: faker.vehicle.color(),
      };
      versionList.push(version);
    });
  }
  return versionList;
};

(() => {
  // random data
  const modelList = radomModelList(3);
  const productList = randomProductList(modelList, 3);
  const versionList = randomVersionList(productList, 3);
  const newList = randomNewList(5);

  // prepare db object
  const db = {
    models: modelList,
    products: productList,
    versions: versionList,
    news: newList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('GENERATE DATA SUCCESSFULLY =))))))');
  });
})();
