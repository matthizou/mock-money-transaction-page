import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { App } from './App';
import { getAccountInfo, accountSelector } from '../../services/accountDuck';

const mapStateToProps = state => {
  return {
    account: accountSelector(state),
  };
};

const mapDispatchToProps = {
  getAccountInfo,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.getAccountInfo();
    },
  }),
);

export const AppContainer = enhance(App);
