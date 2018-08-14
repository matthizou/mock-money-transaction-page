import React from 'react';
import { shallow, mount } from 'enzyme';
import { SendMoneyForm } from '../SendMoneyForm';
import { FormField } from '../components/FormField';

describe('<SendMoneyForm />', () => {
  it('should render 3 fields', () => {
    const wrapper = shallowRenderForm();
    const numberOfFields = wrapper.find(FormField).length;
    expect(numberOfFields).toBe(3);
  });

  it('should have a `<form>` element', () => {
    const wrapper = mountForm();
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should pass the change handler to all the `FormField` components, as a `onChange` prop', () => {
    const handleChange = () => 'Hello';
    const wrapper = shallowRenderForm({ handleChange });
    const fields = wrapper.find(FormField);

    fields.forEach(field => {
      expect(field.props().onChange).toBe(handleChange);
    });
  });

  it('should pass the right input values and errors to the `FormField` components', () => {
    const wrapper = shallowRenderForm({ data: MOCK_DATA });
    const fields = wrapper.find(FormField);

    const testData = (name, index) => {
      const field = fields.get(index);
      const { value, errorMessage: error } = field.props;
      const actualNameData = {
        value,
        error,
      };
      const expectedNameData = MOCK_DATA[name];
      expect(actualNameData).toEqual(expectedNameData);
    };
    testData('name', 0);
    testData('email', 1);
    testData('amount', 2);
  });

  it('should execute the specified submit callback when the form is submitted', () => {
    const handleSubmit = jest.fn();
    const component = mountForm({ handleSubmit });
    const form = component.find('form');
    form.simulate('submit', {});
    expect(handleSubmit).toHaveBeenCalled();
  });
});

//
// MOCK DATA
//

const EMAIL_DATA = {
  value: 'hulk_hogan@wwe.com',
  error: '',
};
const NAME_DATA = {
  value: 'Hulk Hogan',
  error: '',
};
const AMOUNT_DATA = {
  value: '10',
  error: '',
};

const MOCK_DATA = {
  email: EMAIL_DATA,
  name: NAME_DATA,
  amount: AMOUNT_DATA,
};

//
// UTILS
//

const shallowRenderForm = propsOverwrite =>
  renderComponent(propsOverwrite, shallow);

const mountForm = propsOverwrite => renderComponent(propsOverwrite, mount);

const renderComponent = (propsOverwrite = {}, renderFunction) => {
  const props = {
    currency: 'GBP',
    data: {},
    handleChange: Function.prototype,
    handleSubmit: Function.prototype,
    ...propsOverwrite,
  };

  const wrapper = renderFunction(<SendMoneyForm {...props} />);
  return wrapper;
};
