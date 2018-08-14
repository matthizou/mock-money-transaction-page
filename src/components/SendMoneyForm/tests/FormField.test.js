import React from 'react';
import { shallow } from 'enzyme';
import { FormField, ErrorMessage, Label } from '../components/FormField';
import { Input } from '../../Input';

describe('<FormField />', () => {
  it('should contain an <Input> by default, if a `component` prop is not passed', () => {
    const wrapper = renderComponent();
    const input = wrapper.find(Input);
    expect(input).toHaveLength(1);
  });

  it('should pass the `onChange` prop to the input component', () => {
    const onChange = () => 'Changed!';
    const wrapper = renderComponent({ onChange });
    const input = wrapper.find(Input);
    expect(input.props().onChange).toBe(onChange);
  });

  it('should contain the component specified by the `component` prop', () => {
    const MockComponent = () => <div />;
    const wrapper = renderComponent({ component: MockComponent });
    const mockComponent = wrapper.find(MockComponent);
    expect(mockComponent).toHaveLength(1);
  });

  describe('if the `errorMessage` prop is not empty', () => {
    it('should contain an <ErrorMessage> component', () => {
      const wrapper = renderComponent({ errorMessage: '🔥BAM🔥' });
      const errorMessage = wrapper.find(ErrorMessage);
      expect(errorMessage).toHaveLength(1);
    });

    it('should pass the `isInvalid` prop to the embeeded input component', () => {
      const wrapper = renderComponent({ errorMessage: '🔥BAM🔥' });
      const input = wrapper.find(Input);
      expect(input.props().isInvalid).toBeTruthy();
    });
  });

  describe('if the `errorMessage` prop is an empty string', () => {
    it('should not contain an <ErrorMessage> component', () => {
      const wrapper = renderComponent({ errorMessage: '' });
      const errorMessage = wrapper.find(ErrorMessage);
      expect(errorMessage).toHaveLength(0);
    });

    it('should pass the `isInvalid` prop to the embeeded input component', () => {
      const wrapper = renderComponent({ errorMessage: '' });
      const input = wrapper.find(Input);
      expect(input.props().isInvalid).toBeFalsy();
    });
  });

  it('should contain a <Label> if the `label` prop is a non empty string', () => {
    const wrapper = renderComponent({ label: 'Hola' });
    const errorMessage = wrapper.find(Label);
    expect(errorMessage).toHaveLength(1);
  });

  it('should not contain a <Label> if the prop `label` is an empty string', () => {
    const wrapper = renderComponent({ label: '' });
    const errorMessage = wrapper.find(Label);
    expect(errorMessage).toHaveLength(0);
  });
});

//
// UTILS
//
const renderComponent = (modifiedProps = {}) => {
  const props = {
    name: 'name',
    onChange: Function.prototype,
    ...modifiedProps,
  };
  return shallow(<FormField {...props} />);
};
