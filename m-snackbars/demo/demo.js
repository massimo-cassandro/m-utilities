import { snackbar } from '../snackbars';
import { $ } from '../../js-utilities/selector-utilities';

(() => {
  'use strict';

  const messages= [
      'Autem vel consectetur sed. Veritatis ea quo. Recusandae veritatis',
      'nihil voluptatibus aspernatur. Unde laudantium',
      'voluptatem recusandae est veniam dolore rerum corrupti eum.',
      'Aut similique perspiciatis iure odit. Iure ullam et velit non velit excepturi.',
      'Voluptate fuga omnis perferendis eius qui itaque minima.',
      'Incidunt in animi.',
      'Ut est reiciendis sint.',
      'Adipisci voluptatem sequi sit reiciendis nam dolor vel tenetur ullam. Temporibus perspiciatis nihil ut dolores sunt. Ut et provident ad voluptas fugiat quo sunt. Fuga inventore optio repudiandae mollitia dignissimos consectetur adipisci nesciunt. Atque nulla quos quidem labore.'
    ],
    status = ['error', 'warning', 'success', 'std'];

  $('.demo-btn').addEventListener('click', () => {

    snackbar(
      messages[Math.floor(Math.random() * messages.length)],
      status[Math.floor(Math.random() * status.length)]
    );

  }, false);
})();
