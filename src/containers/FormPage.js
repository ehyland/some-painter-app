import React, {Component, PropTypes} from "react";
import { connectToStores } from "fluxible-addons-react";
import Form from "../components/Form";

@connectToStores(["FormStore"], context => ({
  form: context.getStore("FormStore").getForm("EventForm")
}))
class FormPage extends Component {

  static propTypes = {}
  static defaultProps = {}

  render () {
    return (
      <div className="FormPage">
        <Form {...this.props.form.toObject()}/>
      </div>
    );
  }
}

export default FormPage;
