# Sorting Visualizer

알고리즘의 가장 대표적인 개념인 '정렬'을 시각화를 통해 쉽게 이해하기 위한 프로그램입니다.  
랜덤한 데이터를 정렬하는 과정을 차트를 통해 시각적으로 보여줍니다.  
현재는 merge / quick / insertion / selection / bubble sort의 5가지 정렬방법을 제공합니다.  


## Link to the project

...


## Skills used

HTML, CSS, SASS, JavaScript


## Timeline

1.0.0. - Sorting Visualizer (Vanilla JS ver.)  완성  
1.1.0. - 배열 사이즈 조정 슬라이더/정렬 속도 조정 슬라이더 기능 추가  
1.2.0. - 코드 대폭 수정: 
> 애니메이션을 비동기 방식을 동기 안에 넣는 기존의 방식으로는, 애니메이션 진행 중에 사용자와 상호작용이 불가능한 점을 개선.  
> 기존의 forEach-setTimeout 방식에서 setInterval 방식으로 바꾸고, 애니메이션 컨트롤 슬라이더에 값을 저장.  

1.3.0. - 애니메이션 컨트롤 슬라이더 추가  
1.4.0. - 일시정지, 정지 기능 추가  
1.5.0. - 반응형 기능 완성, 스크린 상에서 크기 조절에 맞게 재배치 및 최소 크기 도달 시 안내 화면으로 전환 기능  


## Optimizing

- 새로운 정렬이 만들어질 때마다 내부에서 sorting을 진행하는 기존의 코드를 play 버튼이 직접 눌렸을 때만 sorting을 하는 것으로 수정, 시간 효율성 증대.
- 
