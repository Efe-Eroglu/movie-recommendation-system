# <p align="center">Movie Recommendation System</p>

## Proje Tanımı

Bu proje, kullanıcılara kişisel film önerileri sunan bir web uygulamasıdır. Kullanıcılar, sevdiği film türü, favori yönetmenleri ve önceki izledikleri filmler doğrultusunda öneriler alabilir. Proje, film verileri üzerinde makine öğrenmesi yöntemleri kullanarak, en iyi sonuçları elde etmek amacıyla geliştirilmiştir.


<br>

### Özellikler:
- Film türü, yönetmen tercihi ve önceki izlenen film bilgisiyle kişisel film önerileri.
- API entegrasyonu ile film verilerini dinamik olarak yükleme.
- Kullanıcı dostu bir arayüz ve adım adım yönlendirmelerle öneri süreci.
- Flask backend ve React frontend kullanarak modern web uygulaması.


<br>



## Kullanılan Öneri Modeli : SBERT
* Bu projede SBERT modeli, metin verilerinin (film türleri, yönetmen isimleri, film açıklamaları vb.) vektör temsillerini oluşturmak için kullanılır ve ardından kullanıcı tarafından sağlanan bilgiler (film türü, yönetmen, önceki izlenen film) ile film verileri arasındaki benzerlik hesaplanarak kişisel öneriler üretilir.
* SBERT modeli, metnin anlamını anlayarak, onu sayısal vektör temsillerine (embedding) dönüştürmek için eğitilir. Bu projede SBERT, filmle ilgili metin verilerini işlemek üzere uyarlanmıştır ve film türleri, yönetmenler ve açıklamalar için doğru temsiller oluşturur.
* Öneri Oluşturma: Kosinüs benzerliklerini hesapladıktan sonra, en yüksek benzerliğe sahip filmler seçilir ve kullanıcıya öneri olarak sunulur. Bu filmler, kullanıcının sağladığı bilgilere dayanarak en çok beğenebileceği filmler olacaktır.

<br>




## Projeden Görünütüler


### 1) Ana Sayfa
![homePage](https://github.com/user-attachments/assets/f7111566-e0e0-450f-94c1-8e3f18703405)

<br>



### 2) Öneri Sayfası: Adım 1
![step1](https://github.com/user-attachments/assets/2f5b96dc-b1dc-46c2-a8c7-fa0daa9c3a33)


<br>

### 3) Adım 2
![step2 ](https://github.com/user-attachments/assets/0e63ecb1-6610-4425-8691-f09aa515b52d)


<br>

### 4) Adım 3
![step3](https://github.com/user-attachments/assets/831af02b-9414-4396-ac63-3377ce0c15d9)


<br>



### 5) Sonuç Ekranı
![result](https://github.com/user-attachments/assets/00766f3e-6647-47d5-bb5d-af8c7b10f619)



<br>



### 6) Hakkımızda
![aboutus](https://github.com/user-attachments/assets/e3629458-bd92-4fe7-91a2-0ffad3fae641)


<br>


## Test:
* Bu projede, yazılımın doğruluğunu ve güvenilirliğini sağlamak için hem frontend hem de backend tarafında testler yazılmıştır. Testler, belirli işlevlerin doğru çalışıp çalışmadığını kontrol etmek amacıyla kullanılmaktadır.

### Backend Testleri
* Backend tarafında Flask tabanlı API'nin doğru çalışıp çalışmadığını test etmek için pytest ve Flask-Testing kullanılmıştır. Testler, API uç noktalarını ve işlevlerini kontrol etmeye yöneliktir.
  * Backend Testini Çalıştırma
    
    ```bash
    pytest tests/test_recommendation_api.py
    ```

### Frontend Testleri

* Frontend tarafında, kullanıcı etkileşimlerini ve API'den gelen verilerin doğru şekilde render edilip edilmediğini test etmek amacıyla Jest ve React Testing Library kullanılmıştır.

  * Frontend Testini Çalıştırma
    
    ```bash
    npm test
    ```


## Kurulum

1. Projeyi bilgisayarınıza klonlayın:
  ```bash
  https://github.com/Efe-Eroglu/movie-recommendation-system.git
  ```

2. Backendi Çalıştırma
  ```bash
  cd movie-recommendation-system/Backend
  python run.py
  ```


3. Frontendi Çalıştırma
  ```bash
  cd movie-recommendation-system/Frontend
  npm start
  ```

4. Tarayıcıyı Açın
  ```bash
  # Tarayıcınızdan bu adrese gidin
  http://localhost:3000/
  ```

## Not 
* Bu projede IMBD verileri kullanılmıştır veriye resmi siteden ulaşabilirsiniz.

<br>

## Katkıda Bulunma
* Projede bir hata bulursanız veya bir geliştirme için pull request açabilirsizin.

