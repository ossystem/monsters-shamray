/**
 * Asynchronously loads the component for Questioner
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
