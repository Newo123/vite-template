// $(function () {
//   // Ресайз iframe на 100% ширины контейнера
//   jQuery.fn.resizePageItems = function () {
//     $(this)
//       .find('iframe')
//       .each(function () {
//         if ($(this).attr('height') && $(this).attr('width')) {
//           $(this).attr(
//             'height',
//             $(this).height() * ($(this).parent().width() / $(this).width()),
//           );
//           $(this).attr('width', $(this).parent().width());
//         }
//       });
//   };

//   /*
//   TODO: требует рефакторинга и переосмысления
//    */
//   // let tables = $('.typography__container > table').wrap('<div class="typography__table-box">');
//   // let pImg = $('.typography__container').find('p > img').parent().addClass('page-img');
//   // let img = $('.typography__container').find('img').addClass('page-img');
//   // let iframe = $('.typography__container').find('p > iframe').parent().addClass('page-iframe');
//   // let video = $('.typography__container').find('p > video').parent().addClass('page-img');
// });

// $(window).on('load resize', function () {
//   $('.typography__container').resizePageItems();

//   $(
//     '.typography__container > table, .typography__container > .typography__table-box',
//   ).each(function () {
//     let table = $(this).is('table') ? $(this) : $(this).find('table');
//     /*
//       TODO: дописать условие, чтобы обертка корректно удалялась при ресайзе и добавлялась
//       */
//     if (
//       $(this).parents('.typography__container').width() < table.width() &&
//       !table.parent().hasClass('typography__table-box')
//     ) {
//       $(this).wrap('<div class="typography__table-box">');
//     } else {
//       if (table.parent().hasClass('typography__table-box')) {
//         table.unwrap();
//       }
//     }
//   });
// });

// function wrap(element, wrapperStart, wrapperEnd) {
//   const tag = document.querySelector(element).innerHTML;
//   const newTag = wrapperStart + tag + wrapperEnd;
//   document.querySelector(element).outerHTML = newTag;
// }

// function unwrap(element) {
//   let wrapperEl = document.querySelector(element);

//   while (wrapperEl.firstChild) {
//     wrapperEl.before(wrapperEl.firstChild);
//   }
//   wrapperEl.remove();
// }
// document.addEventListener('DOMContentLoaded', () => {
//   const tables = Array.from(
//     document.querySelectorAll(
//       '.typography__container > table, .typography__container > .typography__table-box',
//     ),
//   );

//   if (tables.length > 0) {
//     tables.forEach(element => {
//       let table =
//         element.tagName === 'TABLE' ? element : element.querySelector('table');

//       if (
//         element.closest('.typography__container').clientWidth <
//           table.clientWidth &&
//         !table.parentElement.classList.contains('typography__table-box')
//       ) {
//         wrap(element, '<div class="typography__table-box">', '</div>');
//       } else if (
//         table.parentElement.classList.contains('typography__table-box')
//       ) {
//         unwrap(element);
//       }
//     });
//   }

const resizePageItems = () => {
  const iframes = Array.from(document.querySelectorAll('iframe'));
  if (iframes.length > 0) {
    iframes.forEach(iframe => {
      const width = iframe.getAttribute('width');
      const height = iframe.getAttribute('height');
      const parent = iframe.parentElement;

      if (width && height) {
        iframe.setAttribute(
          'height',
          (Number(height) * (parent.clientWidth / Number(width))).toString(),
        );
        iframe.setAttribute('width', parent.clientWidth.toString());
      }
    });
  }
};

resizePageItems();
window.addEventListener('resize', resizePageItems);
// });
