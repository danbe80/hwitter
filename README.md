# React-router-dom v6

- 로그아웃 후 url 변경

v5는 Redirect를 사용

```js
<Redirect from="*" to="/" />
```

---

달라진 점

**_ v6는 Redirect가 removed _**

- 해결방안

  1. 버전을 낮춘다.
  2. useNavigate(hook) or Navigate(component)를 사용한다.

  참고 주소) https://ui.dev/react-router-programmatically-navigate

  1. useNavigate(hook) 사용

  ```js
  // Profile.js
  import { useNavigate } from "react-router-dom";
  const Profile = () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
      authService.signOut();
      navigate("/");
    };
  };
  ```

  -> 이 코드의 문제점: 프로필 페이지에서만 url 변경이 일어난다.

  2. Navigate(components) / 이 방법이 오히러 간단하고 좋은 것 같다.

  ```js
  // Router.js
  <Route path="*" element={<Navigate replace to="/" />} />
  ```

## 사용할 DataBase = firebase DB

-firebase DB는 NoSQL DB이다. => 장점)상당히 유연하고 쓰기 쉬움 단점) 몇가지 제약 사항이 있음.

---

## router 이동 후 다시 돌아와 컴포넌트에 state를 변경을 시도했을 때

-> 트윗을 작성하기 전 프로필 컴포넌트로 들어갔다가 다시 돌아와 트윗을 작성했을 때 이와같은 에러가 발생했다.

```
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

이러한 에러가 나온 것은 컴포넌트가 unmount 되었고 상태를 추적할 수 없기 떄문에 메모리 누수가 발생한 것이다. 그러니 useEffect의 cleanup 함수를 사용
