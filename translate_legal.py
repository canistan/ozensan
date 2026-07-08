import re

# Update KVKK Page
def update_kvkk():
    path = "src/app/[locale]/kvkk/page.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # extract the container of text
    # It has Turkish text inside <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">
    if "isEn" not in content:
        content = content.replace("export default function KVKKPage() {", "export default async function KVKKPage({ params }: { params: Promise<{ locale: string }> }) {\n  const locale = (await params).locale;\n  const isEn = locale === 'en';")
        
        tr_text = """
              <p>
                Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, şirketimizle ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVK Kanunu")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Kişisel Verilerin Toplanması ve İşlenmesi</h2>
              <p>
                Kişisel verileriniz, Özensan tarafından sağlanan ticari faaliyetlere ve sunulan hizmetlere bağlı olarak değişkenlik gösterebilmekle birlikte; otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Kişisel Verilerin İşlenme Amaçları</h2>
              <p>
                Toplanan kişisel verileriniz, şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, şirketimizin ve şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini, şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla KVK Kanunu'nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
              <p>
                Toplanan kişisel verileriniz; iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere KVK Kanunu'nun 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
              </p>
        """

        en_text = """
              <p>
                As Özensan Industrial Machinery and Materials Inc. ("Özensan"), we show maximum sensitivity to the security of your personal data. With this awareness, we attach great importance to the processing and preservation of all kinds of personal data belonging to all individuals associated with our company in accordance with the Law on the Protection of Personal Data No. 6698 ("KVKK").
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Collection and Processing of Personal Data</h2>
              <p>
                Your personal data may vary depending on the commercial activities and services provided by Özensan; it can be collected verbally, in writing or electronically by automatic or non-automatic methods, through offices, website, social media channels, mobile applications and similar means.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Purposes of Processing Personal Data</h2>
              <p>
                Your collected personal data will be processed within the personal data processing conditions and purposes specified in Articles 5 and 6 of the KVKK Law for the purposes of carrying out the necessary work by our business units to benefit you from the products and services offered by our company, ensuring the legal and commercial security of our company and those who have a business relationship with our company, determining and implementing our company's commercial and business strategies, and ensuring the execution of our human resources policies.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. To Whom and For What Purpose the Processed Personal Data Can Be Transferred</h2>
              <p>
                Your collected personal data may be transferred to our business partners, suppliers, legally authorized public institutions and private individuals within the framework of the personal data processing conditions and purposes specified in Articles 8 and 9 of the KVKK Law.
              </p>
        """
        
        # Replace the h1 title
        content = content.replace("KVKK Aydınlatma Metni", "{isEn ? 'KVKK Clarification Text' : 'KVKK Aydınlatma Metni'}")
        
        # We find the <p> tags and replace them with the condition
        start_marker = '<div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">'
        end_marker = '</div>\n          </div>'
        
        if start_marker in content and end_marker in content:
            pre, rest = content.split(start_marker, 1)
            inner, post = rest.split(end_marker, 1)
            
            new_inner = f"\n{{isEn ? ({en_text}) : ({tr_text})}}\n"
            content = pre + start_marker + new_inner + end_marker + post

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

# Update Privacy Page
def update_privacy():
    path = "src/app/[locale]/gizlilik-politikasi/page.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "isEn" not in content:
        content = content.replace("export default function PrivacyPolicyPage() {", "export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {\n  const locale = (await params).locale;\n  const isEn = locale === 'en';")
        
        tr_text = """
              <p>
                Bu Gizlilik Politikası, Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak, kullanıcılarımızın kişisel bilgilerini nasıl topladığımızı, kullandığımızı, koruduğumuzu ve paylaştığımızı açıklamaktadır.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Bilgi Toplama</h2>
              <p>
                Sitemizi ziyaret ettiğinizde, iletişim formlarını doldurduğunuzda veya hizmetlerimizden faydalandığınızda ad, soyad, e-posta adresi, telefon numarası gibi kişisel bilgilerinizi toplayabiliriz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
              <p>
                Toplanan bilgiler, sizlere daha iyi hizmet sunmak, taleplerinize yanıt vermek, teknik destek sağlamak ve şirketimizle ilgili yeniliklerden sizi haberdar etmek amacıyla kullanılır.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Bilgi Güvenliği</h2>
              <p>
                Kişisel bilgilerinizin güvenliği bizim için önemlidir. Bilgilerinizi yetkisiz erişime, kullanıma, değiştirmeye ve ifşaya karşı korumak için endüstri standardı güvenlik önlemleri almaktayız.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Üçüncü Taraflarla Paylaşım</h2>
              <p>
                Özensan, kullanıcıların kişisel bilgilerini yasal bir zorunluluk olmadıkça veya kullanıcının açık rızası bulunmadıkça üçüncü şahıslarla paylaşmaz.
              </p>
        """

        en_text = """
              <p>
                This Privacy Policy explains how Özensan Industrial Machinery and Materials Inc. ("Özensan") collects, uses, protects, and shares the personal information of our users.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Information Collection</h2>
              <p>
                We may collect personal information such as your name, surname, e-mail address, and phone number when you visit our site, fill out contact forms, or use our services.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Use of Information</h2>
              <p>
                The collected information is used to provide you with better service, respond to your requests, provide technical support, and inform you about innovations related to our company.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Information Security</h2>
              <p>
                The security of your personal information is important to us. We take industry-standard security measures to protect your information against unauthorized access, use, alteration, and disclosure.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Sharing with Third Parties</h2>
              <p>
                Özensan does not share users' personal information with third parties unless there is a legal obligation or explicit user consent.
              </p>
        """
        
        content = content.replace("Gizlilik Politikası", "{isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}")
        
        start_marker = '<div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">'
        end_marker = '</div>\n          </div>'
        
        if start_marker in content and end_marker in content:
            pre, rest = content.split(start_marker, 1)
            inner, post = rest.split(end_marker, 1)
            
            new_inner = f"\n{{isEn ? ({en_text}) : ({tr_text})}}\n"
            content = pre + start_marker + new_inner + end_marker + post

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

# Update Terms Page
def update_terms():
    path = "src/app/[locale]/kullanim-sartlari/page.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "isEn" not in content:
        content = content.replace("export default function TermsOfUsePage() {", "export default async function TermsOfUsePage({ params }: { params: Promise<{ locale: string }> }) {\n  const locale = (await params).locale;\n  const isEn = locale === 'en';")
        
        tr_text = """
              <p>
                Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Lütfen siteyi kullanmadan önce bu şartları dikkatlice okuyunuz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Genel Koşullar</h2>
              <p>
                Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") web sitesinde yer alan tüm içerik, bilgi, belge ve materyaller bilgilendirme amaçlıdır. Özensan, bu içerikleri önceden haber vermeksizin değiştirme veya kaldırma hakkını saklı tutar.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
              <p>
                Bu sitede yer alan logo, metin, görsel, tasarım ve diğer tüm materyallerin fikri mülkiyet hakları Özensan'a aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçlarla kullanılamaz. Distribütörü olduğumuz global markaların (Cedima, DUSS, Ticab vb.) logoları ve görselleri ilgili markaların kendi mülkiyetindedir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Sorumluluk Reddi</h2>
              <p>
                Özensan, sitedeki bilgilerin doğruluğu ve güncelliği konusunda makul çabayı gösterir ancak bu bilgilerin kesin doğruluğunu garanti etmez. Site kullanımından doğabilecek doğrudan veya dolaylı maddi/manevi zararlardan Özensan sorumlu tutulamaz.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Ürün Bilgileri ve Teknik Detaylar</h2>
              <p>
                Sitede sergilenen ürün teknik özellikleri ve görselleri temsilidir. Üretici firmalar teknik özellikleri değiştirme hakkını saklı tutar. Sipariş öncesi güncel teknik bilgi ve teyit için satış temsilcilerimizle iletişime geçilmesi gerekmektedir.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. Üçüncü Taraf Bağlantıları</h2>
              <p>
                Sitemiz, başka web sitelerine bağlantılar (linkler) içerebilir. Özensan, bu harici sitelerin içeriğinden veya gizlilik politikalarından sorumlu değildir.
              </p>
        """

        en_text = """
              <p>
                By using this website, you are deemed to have accepted the following terms of use. Please read these terms carefully before using the site.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. General Conditions</h2>
              <p>
                All content, information, documents, and materials on the Özensan Industrial Machinery and Materials Inc. ("Özensan") website are for informational purposes. Özensan reserves the right to change or remove this content without prior notice.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Intellectual Property Rights</h2>
              <p>
                The intellectual property rights of all logos, text, images, designs, and other materials on this site belong to Özensan. They cannot be copied, reproduced, or used for commercial purposes without permission. The logos and images of the global brands we distribute (Cedima, DUSS, Ticab, etc.) are the property of their respective brands.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Disclaimer of Liability</h2>
              <p>
                Özensan makes reasonable efforts regarding the accuracy and currency of the information on the site but does not guarantee the absolute accuracy of this information. Özensan cannot be held responsible for direct or indirect material/moral damages that may arise from the use of the site.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">4. Product Information and Technical Details</h2>
              <p>
                The product technical specifications and images displayed on the site are representative. Manufacturing companies reserve the right to change technical specifications. You must contact our sales representatives for up-to-date technical information and confirmation before ordering.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">5. Third-Party Links</h2>
              <p>
                Our site may contain links to other websites. Özensan is not responsible for the content or privacy policies of these external sites.
              </p>
        """
        
        content = content.replace("Kullanım Şartları", "{isEn ? 'Terms of Use' : 'Kullanım Şartları'}")
        
        start_marker = '<div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">'
        end_marker = '</div>\n          </div>'
        
        if start_marker in content and end_marker in content:
            pre, rest = content.split(start_marker, 1)
            inner, post = rest.split(end_marker, 1)
            
            new_inner = f"\n{{isEn ? ({en_text}) : ({tr_text})}}\n"
            content = pre + start_marker + new_inner + end_marker + post

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

# Update Cookies Page
def update_cookies():
    path = "src/app/[locale]/cerez-politikasi/page.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "isEn" not in content:
        content = content.replace("export default function CookiePolicyPage() {", "export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {\n  const locale = (await params).locale;\n  const isEn = locale === 'en';")
        
        tr_text = """
              <p>
                Özensan Sanayi Makine ve Malzemeleri A.Ş. ("Özensan") olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Çerez (Cookie) kullanmaktayız.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. Çerez Nedir?</h2>
              <p>
                Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Çerezleri Neden Kullanıyoruz?</h2>
              <p>
                - Web sitesinin düzgün çalışması için gerekli temel fonksiyonları gerçekleştirmek.<br/>
                - Web sitesini analiz etmek ve performansını artırmak.<br/>
                - Sitenin işlevselliğini artırmak ve kullanım kolaylığı sağlamak.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Çerez Yönetimi</h2>
              <p>
                Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri devre dışı bırakmanız halinde sitemizin bazı özelliklerinden faydalanamayabilirsiniz.
              </p>
        """

        en_text = """
              <p>
                As Özensan Industrial Machinery and Materials Inc. ("Özensan"), we use Cookies so that you can benefit from our website in the most efficient way and to improve your user experience.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">1. What is a Cookie?</h2>
              <p>
                Cookies are small text files saved to your computer or mobile device through your browser when you visit a website.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">2. Why Do We Use Cookies?</h2>
              <p>
                - To perform essential functions required for the website to work properly.<br/>
                - To analyze the website and improve its performance.<br/>
                - To increase the functionality of the site and provide ease of use.
              </p>

              <h2 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">3. Cookie Management</h2>
              <p>
                You have the opportunity to customize your preferences regarding cookies by changing your browser settings. If you disable cookies, you may not be able to use some features of our site.
              </p>
        """
        
        content = content.replace("Çerez Politikası", "{isEn ? 'Cookie Policy' : 'Çerez Politikası'}")
        
        start_marker = '<div className="prose prose-neutral prose-lg max-w-none text-neutral-600 space-y-6">'
        end_marker = '</div>\n          </div>'
        
        if start_marker in content and end_marker in content:
            pre, rest = content.split(start_marker, 1)
            inner, post = rest.split(end_marker, 1)
            
            new_inner = f"\n{{isEn ? ({en_text}) : ({tr_text})}}\n"
            content = pre + start_marker + new_inner + end_marker + post

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

update_kvkk()
update_privacy()
update_terms()
update_cookies()
