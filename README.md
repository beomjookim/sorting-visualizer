# Sorting Visualizer

알고리즘의 가장 대표적인 개념인 '정렬'을 시각화를 통해 쉽게 이해하기 위한 프로그램입니다.  
랜덤한 데이터를 정렬하는 과정을 차트를 통해 시각적으로 보여줍니다.  
현재는 merge / quick / insertion / selection / bubble sort의 5가지 정렬방법을 제공합니다.  


## Skills used

HTML, CSS, SASS(SCSS), JavaScript


## Timeline

1.0.0. - Sorting Visualizer (Vanilla JS ver.), merge sort 기능 완성  
1.1.0. - 배열 사이즈 조정 슬라이더/정렬 속도 조정 슬라이더 기능 추가  
1.2.0. - 코드 대폭 수정: 
> 애니메이션을 비동기 방식을 동기 안에 넣는 기존의 방식으로는, 애니메이션 진행 중에 사용자와 상호작용이 불가능한 점을 개선.  
> 기존의 forEach-setTimeout 방식에서 setInterval 방식으로 바꾸고, 애니메이션 컨트롤 슬라이더에 값을 저장.  
> 애니메이션 시 사용자와의 상호작용과 관련한 모든 부분 그에 맞게 수정.

1.3.0. - 애니메이션 컨트롤 슬라이더 추가  
1.4.0. - 일시정지, 정지 기능 추가  
1.5.0. - 반응형 기능 완성, 스크린 상에서 크기 조절에 맞게 재배치 및 최소 크기 도달 시 안내 화면으로 전환 기능  
1.6.0. - 비교하는 두 개의 바(bar)와, 정렬이 완료된 바에 대해서 색상을 추가하여 유저의 가독성 개선  
1.7.0. - quick sort 기능 추가  
1.8.0. - insertion sort 기능 추가  
1.9.0. - selection sort 기능 추가  
1.10.0. - bubble sort 기능 추가  


## Optimizing

- 새로운 정렬이 만들어질 때마다 내부에서 sorting을 진행하는 기존의 코드를 play 버튼이 직접 눌렸을 때만 sorting을 하는 것으로 수정, 시간 효율성 증대. 한 사이즈 값에서 다른 사이즈 값으로 옮겨갈 때, 기존 코드는 약 25ms가 들었는데 현재 코드는 이를 9ms로 단축, <strong>약 64% 단축함</strong>. 슬라이더 작동 방식의 특성상 기존 값에서 옮겨갈 값 사이에 위치한 모든 값에 대해 이렇게 효율화 되었으므로, 물리적인 시간은 더욱 극단적으로 효율화 됨. 아래는 개발자 도구 - 퍼포먼스 탭에서 성능 측정한 후 비교한 사진.  
  ### before: 약 25ms 소요
  <img src="https://user-images.githubusercontent.com/29809668/161408302-bd771fea-1385-403a-af44-2e4e5dda0946.png" width="500"/>
  
  ### after: 약 9ms 소요
  <img src="https://user-images.githubusercontent.com/29809668/161408306-552d0503-c2e5-4b00-8257-aaca133aa0a9.png" width="300"/>  


## Refactoring

코드를 처음 짤 때부터 ES6 문법에 맞게 짰습니다.  
기능 구현 이후 본격적으로 '마틴 파울러'의 '리팩터링 2판'을 참고하여 아래와 같이 JS 코드 전체 리팩터링 진행했습니다.  

- CSS: 네이밍을 BEM 방식으로 수정.
- JavaScript:
  - 변수, 함수 중 중복되는 등의 통합이 필요한 경우 추출 및 통합.
  - 변수는 '뭔지'가 드러나게 명사형으로, 함수는 '뭐하는지'가 드러나게 동사형으로 지정.
  - 함수의 파라미터는 3개 이하로 조정.
  - 반복문은 가능한한 파이프라인으로 수정.
  - 파라미터를 직접 수정하지 않고 임시변수를 활용.


## Screenshots

<img src="https://user-images.githubusercontent.com/29809668/163200027-bca322bf-0f86-4e5f-af3e-f1385d7ae0cd.png" width="700"/>

1. Generate Bars 버튼: 랜덤한 높이의 바들을 정해진 개수만큼 만듭니다.
2. '# of Bars' 슬라이더: 바의 개수를 조정합니다.
3. Sorting Speed 슬라이더: 정렬 애니메이션의 속도를 조절합니다.
4. Algorithm Select 폼: 어떤 정렬 알고리즘을 시전할지 정합니다.
5. PLAY(PAUSE) 버튼: 애니메이션을 재생합니다. 이후 일시정지 기능으로 바뀝니다.
6. STOP 버튼: 애니메이션을 멈추고 초기화시킵니다.
7. 애니메이션 렌더링 화면: 정렬하는 과정을 애니메이션으로 렌더링합니다. 색깔은 변합니다.

<img src="https://user-images.githubusercontent.com/29809668/163201244-cdef7cb2-0c33-410d-8605-2c5c4ff936cf.png" width="700"/>

색깔 범례:
  - 연두색: 기본 바
  - 분홍색: 비교 중인 두 개의 바
  - 하늘색: 정렬 완료된 바
  - 주황색: 퀵 소트에서의 


## [Link to the project](https://sorting-visualizer-jayden.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/dffa3400-1422-4f50-9f40-06f1310bbe98/deploy-status)](https://app.netlify.com/sites/sorting-visualizer-jayden/deploys)
