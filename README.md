# ptk-accordion 

Create a simple lightweight accordion by just adding your desired accordion data as a JSON structure to the ptk-accordion custom tag.



## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install foobar.


## Usage

Add below tags in your desired HTML page with the id **ptk-accordion**.
```bash
<ptk-accordion></ptk-accordion>
```

Provide data to the **data-accordion** tag in the below **format**
```bash
<ptk-accordion
      id="ptk-accordion"
      data-accordion='[
    {
      "headerName": "Header one",
      "data" : "Data one"
    },
    {
      "headerName": "Header two",
      "data" : "Data two"
    }]'
    >
    </ptk-accordion>
```


# Attributes

Attribute | value | Additional information
--- | --- | --
showDefaultAccordionIndex | "1" | (Optional ) Index value based on the JSON structure provided to data-accordion, Opens the accordion data by default when accordion is loaded.
showMultiple | "true"/"false" | (Optional ) If value is "true" multiple accordion data's can be opened else only one will be opened.
toggleIcons | "true"/"false" | (Optional ) If value is "true" then custom icons can be added using **showArrow** and **hideArrow** attributes
showArrow | "icon tag"  | (**Mandatory if toggleIcons value is true**) example : `'<i class="fa fa-angle-down custom"></i>'`
hideArrow | "icon tag"  | (**Mandatory if toggleIcons value is true**) example : `'<i class="fa fa-angle-up custom"></i>'`
showAnimateDuration | "1s"  | (Optional) Animation duration to open the accordion data
hideAnimateDuration | "1s"  | (Optional) Animation duration to close the accordion data

```
Development is still in progress.........
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
