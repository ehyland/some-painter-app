import React, {Component, PropTypes} from "react";
import FormField from "../components/FormField";

class SubmitEventPage extends Component {

  static propTypes = {}
  static defaultProps = {}

  static formFields = [
    {
      type: "text",
      label: "Gallery",
      name: "UserSubmittedGallery"
    },
    {
      type: "text",
      label: "Artist Name",
      name: "UserSubmittedArtistName"
    },
    {
      type: "text",
      label: "Start Date",
      name: "UserSubmittedStartDate"
    },
    {
      type: "checkbox",
      label: "Free Drinks?",
      name: "UserSubmittedHasFreeDrinks"
    }
  ];

  handleFormSubmission (e) {
    e.preventDefault();
    const result = SubmitEventPage.formFields.map(fieldOptions => ({
      name: fieldOptions.name,
      value: this.refs[fieldOptions.name].getValue()
    }))
    console.log(result);
  }

  render () {

    return (
      <div className="SubmitEventPage">
        <div className="container">
          <form className="Form" onSubmit={this.handleFormSubmission.bind(this)}>
            <h1 className="Form-header">
              Create an event
            </h1>
            <div className="Form-fields">
              {SubmitEventPage.formFields.map(options => (
                <FormField key={options.name} {...options} ref={options.name}/>
              ))}
            </div>
            <div className="FormActions">
              <input className="FormActions-submit" type="submit"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SubmitEventPage;
