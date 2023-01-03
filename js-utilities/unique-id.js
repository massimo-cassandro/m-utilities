// import uniqid from '@massimo-cassandro/m-utilities/js-utilities/unique-id';

export default function () {
  return '_' + Number(Math.round(Math.random() * Date.now())).toString(36);
}
