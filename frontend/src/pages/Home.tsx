
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="hero-section">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Endometriosis <span className="gradient-text">Detection</span> & Analytics
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Early detection leads to better outcomes. Our ML-powered tool helps predict endometriosis risk based on clinical indicators.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link to="/predict">
                  <Button size="lg" className="bg-endo hover:bg-endo/90 text-white animate-slide-in">
                    Start Prediction
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
                  Learn More ↓
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="glass-card p-1">
                <img
                  src="https://img.freepik.com/free-vector/endometriosis-concept-illustration_114360-25594.jpg"
                  alt="Medical professionals analyzing data"
                  className="rounded-xl"
                  width="550"
                  height="400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Endometriosis Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">What is Endometriosis?</h2>
            <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-endo to-medical-500 rounded-full"></div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Endometriosis</strong> is a chronic condition where tissue similar to the lining of the uterus grows outside the uterus. This tissue can be found on the ovaries, fallopian tubes, and other areas in your pelvis.
              </p>
              <p className="text-lg">
                This misplaced tissue continues to act as it normally would during the menstrual cycle: it thickens, breaks down, and bleeds. Because this tissue has no way to exit your body, it becomes trapped, causing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Severe pain during periods</li>
                <li>Chronic pelvic pain</li>
                <li>Pain during intercourse</li>
                <li>Fertility issues</li>
                <li>Digestive and urinary problems</li>
              </ul>
            </div>
            <div>
              <div className="glass-card p-1 h-full">
                <img
                  src="https://img.freepik.com/free-vector/endometriosis-abstract-concept-vector-illustration-endometrium-dysfunctionality-gynecological-clinic-endometriosis-diagnostic-treatment-female-reproductive-function-abstract-metaphor_335657-4063.jpg"
                  alt="Endometriosis illustration"
                  className="rounded-xl h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-endo/5">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">Endometriosis: Global Impact</h2>
            <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-endo to-medical-500 rounded-full"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="stat-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-4xl font-bold gradient-text">1 in 10</h3>
              <p className="text-sm mt-2 text-gray-600">women globally are affected by endometriosis</p>
            </div>
            <div className="stat-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-4xl font-bold gradient-text">7+ years</h3>
              <p className="text-sm mt-2 text-gray-600">average delay in diagnosis from symptom onset</p>
            </div>
            <div className="stat-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-4xl font-bold gradient-text">$78B</h3>
              <p className="text-sm mt-2 text-gray-600">annual economic burden in the US alone</p>
            </div>
            <div className="stat-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-4xl font-bold gradient-text">30-50%</h3>
              <p className="text-sm mt-2 text-gray-600">of women with endometriosis experience infertility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Factors Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold">Key Risk Factors</h2>
            <div className="mt-1 h-1 w-24 mx-auto bg-gradient-to-r from-endo to-medical-500 rounded-full"></div>
            <p className="mt-4 text-muted-foreground">
              Our prediction model focuses on these key risk factors and symptoms
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-semibold mb-2">Chronic Pain</h3>
              <p className="text-muted-foreground">Persistent or recurring pelvic pain is one of the primary symptoms of endometriosis.</p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-semibold mb-2">BMI Correlation</h3>
              <p className="text-muted-foreground">Research suggests that BMI can be a factor in the development and severity of endometriosis.</p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-semibold mb-2">Age Distribution</h3>
              <p className="text-muted-foreground">Most commonly diagnosed in women in their 30s and 40s but can affect women of all ages.</p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-xl font-semibold mb-2">Hormonal Imbalance</h3>
              <p className="text-muted-foreground">Estrogen plays a significant role in endometriosis development and progression.</p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-xl font-semibold mb-2">Menstrual Irregularities</h3>
              <p className="text-muted-foreground">Heavy bleeding, irregular periods, and spotting can indicate endometriosis.</p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h3 className="text-xl font-semibold mb-2">Infertility</h3>
              <p className="text-muted-foreground">Approximately 30-50% of women with endometriosis experience infertility issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-endo/5 to-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">Take the First Step</h2>
            <p className="text-lg mb-6">
              Early detection and proper management can significantly improve quality of life for those with endometriosis.
            </p>
            <Link to="/predict">
              <Button size="lg" className="bg-endo hover:bg-endo/90 text-white">
                Start Your Assessment Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
