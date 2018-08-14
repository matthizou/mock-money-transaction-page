import {
  compose,
  lifecycle,
  branch,
  setDisplayName,
  renderComponent,
  withState,
} from 'recompose';
import { connect } from 'react-redux';
//import { status } from '@Common/enums/status';
import Spinner from '../components/Spinner';

const status = {
  LOADING: 0,
  COMPLETED: 1,
  ERROR: 2,
};

/**
 * HoC to dispatch or execute an async function which will prevent the specific
 * component rendering until the Promise is resolved
 */
export const awaitAsync = (asyncFunction, onComplete) =>
  compose(
    setDisplayName('awaitAsync'),
    withState('awaitStatus', 'setAwaitStatus', status.LOADING),
    lifecycle({
      componentWillMount: async function waitAsyncAction() {
        const { setAwaitStatus } = this.props;

        // Perform the async function
        try {
          const result = await asyncFunction(this.props);
          if (onComplete) {
            await onComplete(result, this.props);
          }
          setAwaitStatus(status.COMPLETED);
        } catch (error) {
          setAwaitStatus(status.ERROR);
        }
      },
    }),
    branch(
      ({ awaitStatus }) => awaitStatus === status.LOADING,
      renderComponent(Spinner),
    ),
  );

export const awaitAction = (action, onComplete) =>
  compose(
    setDisplayName('awaitAction'),
    connect(), // Insert dispatch
    awaitAsync(props => props.dispatch(action(props)), onComplete),
  );
