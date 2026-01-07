import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Blogs.css';

const Blogs = () => {
  const [expandedBlog, setExpandedBlog] = useState(null);

  const blogPosts = [
    {
   id: 2,
      title: 'Latest Event Decoration Trends 2024',
      excerpt: 'Discover the hottest decoration trends that will make your event stand out. From minimalist designs to bold statements...',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600',
      date: 'December 10, 2024',
      category: 'Trends',
      fullContent: {
        intro: 'Event decoration trends are constantly evolving, and 2024 brings exciting new styles that blend elegance with innovation. Stay ahead with these trending designs.',
        images: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
          'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800'
        ],
        sections: [
          {
            title: 'Sustainable & Eco-Friendly Decor',
            content: 'Going green is a movement! Choose sustainable materials, potted plants instead of cut flowers, and reusable decorations that minimize environmental impact.'
          },
          {
            title: 'Bold Color Palettes',
            content: 'Deep jewel tones like emerald, sapphire, and amethyst are making statements. These rich colors create dramatic, luxurious atmospheres.'
          },
          {
            title: 'Minimalist Elegance',
            content: 'Less is more with clean lines, neutral colors, and sophisticated arrangements. This timeless style creates elegant, uncluttered spaces.'
          },
          {
            title: 'Interactive Installations',
            content: 'Photo walls, neon signs, and interactive art pieces engage guests and create Instagram-worthy moments everyone will remember.'
          },
          {
            title: 'Natural Elements',
            content: 'Wood accents, stone elements, and organic textures bring the outdoors in, creating warm, inviting, and authentic spaces.'
          },
          {
            title: 'Dramatic Lighting',
            content: 'Strategic uplighting, string lights, and custom gobos transform venues and create perfect ambiance for memorable celebrations.'
          }
        ],
        conclusion: 'Let Lavendro bring these trending designs to life at your next event. Our expert decorators create stunning, memorable celebrations!'
      }
    },

    {
      id: 4,
      title: 'Corporate Event Success Strategies',
      excerpt: 'Make your corporate event memorable with these proven strategies for engaging attendees and achieving your business goals...',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
      date: 'November 28, 2024',
      category: 'Corporate Events',
      fullContent: {
        intro: 'Corporate events are powerful tools for building team morale, impressing clients, and celebrating milestones. Here\'s how to ensure success.',
        images: [
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800'
        ],
        sections: [
          {
            title: 'Define Clear Objectives',
            content: 'What do you want to achieve? Whether team building, product launch, or client appreciation, clear goals guide every decision.'
          },
          {
            title: 'Know Your Audience',
            content: 'Understand attendees\' preferences and backgrounds. Tailor content and activities to engage them effectively throughout the event.'
          },
          {
            title: 'Choose the Right Format',
            content: 'Consider whether a conference, workshop, networking mixer, or gala best suits your objectives and audience expectations.'
          },
          {
            title: 'Invest in Quality AV Equipment',
            content: 'Professional presentations require reliable audio-visual setup. Poor sound or video can undermine even the best content.'
          },
          {
            title: 'Create Networking Opportunities',
            content: 'Incorporate breaks, cocktail hours, or structured networking. These connections are often the most valuable takeaway.'
          },
          {
            title: 'Brand Everything',
            content: 'Consistent branding from signage to digital displays reinforces company identity and creates professional polish.'
          }
        ],
        conclusion: 'Lavendro specializes in corporate events with professional venues, advanced AV equipment, and expert coordination. Let us handle the details!'
      }
    },
    {
      id: 5,
      title: 'Catering Menu Planning Guide',
      excerpt: 'Creating the perfect menu for your event requires careful consideration. Here\'s everything you need to know about catering...',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
      date: 'November 20, 2024',
      category: 'Catering',
      fullContent: {
        intro: 'The food at your event can make or break guest experience. A well-planned menu delights attendees and creates memorable moments.',
        images: [
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
        ],
        sections: [
          {
            title: 'Understand Dietary Restrictions',
            content: 'Always ask guests about allergies and preferences. Offer vegetarian, vegan, and gluten-free options to accommodate everyone comfortably.'
          },
          {
            title: 'Consider Your Event Type',
            content: 'Formal sit-down dinners suit weddings and galas. Buffets work for casual events. Cocktail receptions need finger foods and small bites.'
          },
          {
            title: 'Match Food to Your Theme',
            content: 'A beach wedding features seafood and tropical flavors. A rustic celebration showcases comfort food and local specialties.'
          },
          {
            title: 'Don\'t Forget Beverages',
            content: 'Plan for alcoholic and non-alcoholic options. Consider signature cocktails that match your theme colors and style.'
          },
          {
            title: 'Timing is Everything',
            content: 'Coordinate meal service with your event schedule. Hot food should be served hot, cold dishes cold, and nothing should sit too long.'
          },
          {
            title: 'Presentation Matters',
            content: 'Beautiful plating and creative displays elevate dining experience. Work with caterers who understand food presentation artistry.'
          }
        ],
        conclusion: 'Explore Lavendro\'s exquisite catering menus featuring gourmet options for every taste and budget. Unforgettable dining experiences await!'
      }
    },
    {
      id: 6,
      title: 'Birthday Party Ideas for All Ages',
      excerpt: 'From kids to adults, discover creative birthday party ideas that will make celebrations unforgettable for everyone...',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
      date: 'November 15, 2024',
      category: 'Birthday Parties',
      fullContent: {
        intro: 'Birthday celebrations should be as unique as the person being honored. Whether planning for kids, teens, or adults, these creative ideas make birthdays unforgettable.',
        images: [
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800'
        ],
        sections: [
          {
            title: 'Kids\' Birthday Themes',
            content: 'Popular themes include superheroes, princesses, dinosaurs, and favorite characters. Interactive activities like face painting and magic shows entertain.'
          },
          {
            title: 'Teen Birthday Celebrations',
            content: 'Teens appreciate grown-up events. Consider movie nights, pool parties, gaming tournaments, or escape room adventures they\'ll love.'
          },
          {
            title: 'Adult Birthday Parties',
            content: 'Milestone birthdays deserve special celebrations. Think wine tasting, cocktail parties, destination getaways, or elegant dinner parties.'
          },
          {
            title: 'Outdoor Adventures',
            content: 'Beach parties, picnics, and garden gatherings work beautifully for any age. Nature provides the perfect backdrop for celebrations.'
          },
          {
            title: 'Themed Costume Parties',
            content: 'Decades parties, masquerade balls, or movie themes encourage creativity and create photo opportunities everyone will cherish.'
          },
          {
            title: 'Personal Touches',
            content: 'Custom cakes, personalized decorations, and memory displays show thoughtfulness and make the birthday person feel truly special.'
          }
        ],
        conclusion: 'Let Lavendro plan an unforgettable birthday celebration tailored to any age and interest. From kids to milestones, we create magic!'
      }
    },
    {
      id: 7,
      title: 'Outdoor Event Planning Essentials',
      excerpt: 'Planning an outdoor event? Here are the essential tips to ensure your alfresco celebration goes smoothly regardless of conditions...',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600',
      date: 'November 10, 2024',
      category: 'Outdoor Events',
      fullContent: {
        intro: 'Outdoor events offer natural beauty and fresh air but require extra planning. Follow these essential tips for successful alfresco celebrations.',
        images: [
          'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800'
        ],
        sections: [
          {
            title: 'Always Have a Backup Plan',
            content: 'Weather is unpredictable. Secure tents, an indoor alternative, or flexible date options to protect against rain, wind, or extreme temperatures.'
          },
          {
            title: 'Consider Seasonal Factors',
            content: 'Each season brings unique challenges. Summer heat requires shade and hydration. Fall and spring need heating options and weather monitoring.'
          },
          {
            title: 'Plan for Comfort',
            content: 'Provide adequate seating, shade structures, fans or heaters, and accessible restroom facilities for guest comfort throughout the event.'
          },
          {
            title: 'Lighting is Crucial',
            content: 'If your event extends to evening, plan string lights, lanterns, or professional lighting for ambiance and safety as daylight fades.'
          },
          {
            title: 'Manage Sound Carefully',
            content: 'Outdoor venues need quality sound systems. Consider noise ordinances and neighboring properties when planning music and entertainment.'
          },
          {
            title: 'Protect Against Insects',
            content: 'Provide bug spray, citronella candles, and choose times when insects are less active. Evening events may need mosquito control services.'
          }
        ],
        conclusion: 'Lavendro\'s outdoor venues come prepared with weather contingencies and comfort amenities. Enjoy nature\'s beauty worry-free!'
      }
    },
    {
      id: 8,
      title: 'Event Photography Tips & Trends',
      excerpt: 'Capture your special moments perfectly with these professional photography tips and the latest trends in event documentation...',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
      date: 'November 5, 2024',
      category: 'Photography',
      fullContent: {
        intro: 'Great event photography preserves memories forever. Whether hiring professionals or managing it yourself, these tips ensure stunning results.',
        images: [
          'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
        ],
        sections: [
          {
            title: 'Hire the Right Photographer',
            content: 'Review portfolios, check references, and meet candidates. Ensure their style matches your vision and they understand your event flow.'
          },
          {
            title: 'Create a Shot List',
            content: 'List must-have moments and important people to photograph. Share this with your photographer to ensure nothing important is missed.'
          },
          {
            title: 'Plan for Golden Hour',
            content: 'Schedule key photos during golden hour (hour before sunset) for naturally beautiful, warm-toned lighting that flatters everyone.'
          },
          {
            title: 'Consider Candid Moments',
            content: 'While posed photos are important, candid shots often capture the true emotion and joy of your celebration authentically.'
          },
          {
            title: 'Use Photo Booths',
            content: 'Interactive photo booths entertain guests and provide fun keepsakes. Modern booths offer props, filters, and instant social media sharing.'
          },
          {
            title: 'Drone Photography Trend',
            content: 'Aerial drone shots provide unique perspectives, especially for outdoor venues. Stunning overhead views create dramatic, memorable images.'
          }
        ],
        conclusion: 'Lavendro works with top photographers who capture your event\'s magic. Professional documentation ensures lasting memories!'
      }
    }
  ];

  const handleReadMore = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
    if (expandedBlog !== blogId) {
      setTimeout(() => {
        document.getElementById(`blog-${blogId}`)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  return (
    <div className="blogs-page">
      <Navbar />
    
      <section className="blogs-hero">
        <motion.div 
          className="blogs-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Our Blog</h1>
          <p>Expert tips, trends, and inspiration for your events</p>
        </motion.div>
      </section>

      <section className="blogs-section">
        <div className="blogs-grid">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              id={`blog-${post.id}`}
              className={`blog-card ${expandedBlog === post.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              layout
            >
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>

                <AnimatePresence>
                  {expandedBlog === post.id && (
                    <motion.div 
                      className="blog-full-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="blog-intro">{post.fullContent.intro}</p>
                      
                      <div className="blog-content-images">
                        {post.fullContent.images.map((img, idx) => (
                          <img key={idx} src={img} alt={`${post.title} ${idx + 1}`} />
                        ))}
                      </div>

                      <div className="blog-sections">
                        {post.fullContent.sections.map((section, idx) => (
                          <div key={idx} className="blog-section">
                            <h4>{section.title}</h4>
                            <p>{section.content}</p>
                          </div>
                        ))}
                      </div>

                      <p className="blog-conclusion">{post.fullContent.conclusion}</p>

                      <Link to="/contact" className="btn-contact-us">
                        Contact Us to Get Started
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => handleReadMore(post.id)}
                  className="btn-read-more"
                >
                  {expandedBlog === post.id ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="subscribe-section">
        <motion.div 
          className="subscribe-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest event planning tips and trends</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-subscribe">Subscribe</button>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;
