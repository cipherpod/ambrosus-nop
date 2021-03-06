/*
Copyright: Ambrosus Inc.
Email: tech@ambrosus.com

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import web3Utils from '../utils/web3_utils';

const payoutAction = (payoutsActions, availablePayoutDialog, confirmPayoutWithdrawalDialog, withdrawalSuccessfulDialog) => async () => {
  const availablePayout = web3Utils.fromWei(await payoutsActions.getTotalAvailablePayout(), 'ether');
  await availablePayoutDialog(availablePayout);
  if (availablePayout !== '0' && (await confirmPayoutWithdrawalDialog()).payoutConfirmation) {
    await payoutsActions.withdraw();
    await withdrawalSuccessfulDialog(availablePayout);
  }
  return false;
};

export default payoutAction;
