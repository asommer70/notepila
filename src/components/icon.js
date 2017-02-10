import React from 'react';

export default (props) => {
  let data;
  switch (props.name) {
    case 'folder':
      data = "M 936 95 L 910 95 L 644 95 L 449 95 L 325 0 L 63 0 C 28 0 0 28 0 63 L 0 356 L 0 394 L 0 548 L 0 723 L 0 736 C 0 771 28 800 63 800 L 379 800 L 620 800 L 936 800 C 971 800 1000 771 1000 736 L 1000 723 L 1000 548 L 1000 158 C 1000 123 971 95 936 95 z M 42 63 C 42 51 51 42 63 42 L 310 42 L 435 137 L 644 137 L 910 137 L 936 137 C 948 137 957 146 957 158 L 957 187 L 427 187 L 377 245 L 63 245 C 56 245 49 247 42 249 L 42 63 z";
      break;
    case 'activeFolder':
      data = "M 478 553 L 1000 132 L 472 712 L 249 432 L 478 553 z M 601 616 L 711 616 C 737 616 759 594 759 567 L 759 557 L 759 442 L 601 616 z M 225 451 C 216 440 216 423 226 412 C 232 405 240 401 249 401 C 254 401 259 402 264 404 L 474 516 L 759 286 L 759 122 C 759 95 737 73 711 73 L 691 73 L 489 73 L 341 73 L 247 0 L 48 0 C 21 0 0 21 0 48 L 0 275 L 0 304 L 0 423 L 0 557 L 0 567 C 0 594 21 616 48 616 L 288 616 L 357 616 L 225 451 z M 32 192 L 32 48 C 32 39 39 32 48 32 L 236 32 L 330 105 L 489 105 L 691 105 L 711 105 C 720 105 727 113 727 122 L 727 144 L 324 144 L 286 189 L 48 189 C 42 189 37 190 32 192 z";
      break;
    case 'note':
      data = "M 0 0 L 0 1000 L 716 1000 L 716 0 L 0 0 z M 365 767 L 213 767 L 191 767 L 124 767 L 124 676 L 191 676 L 213 676 L 365 676 L 365 767 z M 592 545 L 213 545 L 191 545 L 124 545 L 124 454 L 191 454 L 213 454 L 592 454 L 592 545 z M 592 323 L 213 323 L 191 323 L 124 323 L 124 232 L 191 232 L 213 232 L 592 232 L 592 323 z";
      break;
    case 'activeNote':
      data = "M 0 0 L 0 1000 L 716 1000 L 716 0 L 0 0 z M 292 678 L 160 521 L 234 458 L 295 531 L 484 321 L 556 386 L 292 678 z";
      break;
    case 'check':
      data = "M 363 755 L 0 446 L 133 289 L 355 477 L 857 0 L 1000 149";
      break;
    case 'x':
      data = "M 154 0 L 0 155 L 344 500 L 0 845 L 155 1000 L 500 655 L 844 1000 L 999 844 L 655 500 L 1000 155 L 844 0 L 500 345 L 154 0 L 154 0 z";
      break;
    case 'plus':
      data = "M 591 0 L 408 0 L 408 408 L 0 408 L 0 591 L 408 591 L 408 1000 L 591 999 L 591 591 L 1000 591 L 999 408 L 591 408 L 591 0 L 591 0 z";
      break;
  }

  return (
    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 512 512">
      <path transform="matrix(0.512,0,0,0.512,0,0)" stroke="none" d={data} />
    </svg>
  )
}
