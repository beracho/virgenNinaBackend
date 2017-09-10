# sequelize-formly

A module that produces a REST options for a database schema in a formly format.
NOTE: Currently, this implementation supports POSTGRESQL only.

## Prerequisites
This module requires:

    express
    sequelize

## Installation

```
$ npm install sequelize-formly
```

## Usage

To define the route, do:

```
var sequelizeFormly = require('sequelize-formly');
app.options('/hammers', sequelizeFormly.formly(Model));
```

or
```
import sequelizeFormly from "sequelize-formly";
app.options('/hammers', sequelizeFormly.formly(Model));
```

## API

A correct execution returns a 201 status code.
```
app.options('/hammers', sequelizeFormly.formly(Model));
```

Example request:
```
OPTIONS /hammers
Content-Type: application/json
{
    "key": "hammers",
    "type": "input",
    "templateOptions": {
      "type": "number",
      "label": "hammers",
      "required": true
    }
}
```

## LABEL FORMLY IN SEQUELIZE

xlabel needs to be defined in each model field.

```
Field1: {
    type: DataType.BLOB,
    field: 'demo1',
    allowNull: false,
    xlabel: "Demo Label 1",
}
```

## CHOICE FORMLY IN SEQUELIZE

xchoice needs to be added to belongsto relations in the model.

```
Model1.belongsTo(Model2, {as: 'model_relation', foreignKey:{name: 'id_model', allowNull: false, xchoice:'field_name'}});
```

or by concatenating fields

```
Model1.belongsTo(Model2, {as: 'model_relation', foreignKey:{name: 'id_model', allowNull: false, xchoice:'field_name1+field_name2'}});
```
## ADD CORS

```
var cors = require('cors');
app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        "preflightContinue": true,
        "headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Headers": "Authorization, Content-Type"
    }));
```