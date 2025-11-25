import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  // Candidate Image
  const CANDIDATE_IMAGE_URL = "https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/515441812_10163003867507920_4808851483961703661_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFkXpxZfRZCiS6tUkMuNIwhz6Ix5oWf9IPPojHmhZ_0g3q-yrs_5MJM8xygdYYX5g4&_nc_ohc=O_SI0alOrEUQ7kNvwFE3BmL&_nc_oc=AdkQ-x4mJmZz5C-Peh1kc9yDFigPG46vldlmExHwi79lZshgP8YqbgstLrh_t8KoN4Y&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=ZVbXGcOeCipYDkVva7FcmA&oh=00_Afd9WY4XJWo_eBqDQdctSg_i9eSVJ3yuBWa15kvxQYC1Og&oe=68FCCF73";

  return (
    <section className="relative bg-slate-50 lg:min-h-[85vh] flex flex-col lg:flex-row items-center overflow-hidden">
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 px-6 py-16 lg:py-24 lg:pl-20 xl:pl-32 z-10">
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>MP for Cape Coast North</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Hon. Dr. Kwamena <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
              Minta Nyarku
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            "Obiara Ka Ho." Championing the <strong>CETRA2030</strong> agenda to build a self-sustaining economy through education, innovation, and unity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={() => onNavigate('volunteer')} 
              variant="primary" 
              size="lg"
              className="shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20"
            >
              Join the Movement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => onNavigate('about')} 
              variant="outline" 
              size="lg"
              className="bg-white"
            >
              Meet Ragga
            </Button>
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-[85vh] relative">
        <div className="absolute inset-0 bg-blue-900/5 lg:bg-transparent"></div>
        {/* Decorative Shape */}
        <div className="hidden lg:block absolute -left-24 inset-y-0 w-48 bg-slate-50 transform -skew-x-6 z-10"></div>
        
        <img 
          src={CANDIDATE_IMAGE_URL} 
          alt="Hon. Dr. Kwamena Minta Nyarku" 
          className="w-full h-full object-cover object-top"
        />
        
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
      </div>
    </section>
  );
}