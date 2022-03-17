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
