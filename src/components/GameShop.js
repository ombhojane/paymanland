import styled from 'styled-components';
import React, { useState } from 'react';


const GameShopContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  color: #333333;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 1300px;
  max-width: 95vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
`;

const ShopTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ShopContent = styled.div`
  display: flex;
  flex: 1;
  gap: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Sidebar = styled.div`
  width: 220px;
  background-color: #f1f3f5;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  cursor: pointer;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? '#e0e0e0' : 'transparent'};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ProductGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  padding: 25px;
  overflow-y: auto;
`;

const ProductCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  width: 180px;
  height: 180px;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999999;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 500;
  color: #2c3e50;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #3498db;
  font-weight: 600;
`;

const ProductView = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ProductViewHeader = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

const ProductViewImage = styled(ProductImage)`
  width: 400px;
  height: 400px;
  flex-shrink: 0;
`;

const ProductViewInfo = styled.div`
  flex: 1;
`;

const ProductViewTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  color: #2c3e50;
  font-weight: 600;
`;

const ProductViewDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #555555;
`;

const ProductViewDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const ProductViewPrice = styled.span`
  font-size: 24px;
  color: #3498db;
  font-weight: 600;
`;

const ProductViewUpvotes = styled.span`
  font-size: 18px;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BuyButton = styled.a`
  background-color: #2ecc71;
  color: #ffffff;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-block;

  &:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductViewSection = styled.div`
  margin-top: 30px;
`;

const ProductViewSectionTitle = styled.h3`
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 500;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  font-size: 16px;
  color: #555555;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &:before {
    content: '✓';
    color: #2ecc71;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ProductViewContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: #ffffff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const TryOnButton = styled.button`
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    background-color: #2980b9;
  }
`;

const TryOnModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const TryOnContent = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const TryOnTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
`;

const TryOnImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

const TryOnImage = styled.img`
  max-width: 45%;
  max-height: 80%;
  object-fit: contain;
`;

const UploadButton = styled.label`
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const GameShop = ({ shopData }) => {
    const [selectedCategory, setSelectedCategory] = useState('Trending');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showTryOn, setShowTryOn] = useState(false);
    const [userImage, setUserImage] = useState(null);
    const [tryOnResult, setTryOnResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const allProducts = Object.values(shopData.categories).flat();
    const trendingProducts = allProducts.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);
  
    const displayProducts = selectedCategory === 'Trending' 
      ? trendingProducts 
      : shopData.categories[selectedCategory] || [];
  
    const handleBackToHome = () => {
      setSelectedProduct(null);
    };
  
    const handleTryOn = () => {
      setShowTryOn(true);
    };
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setUserImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };
  
    const handleVirtualTryOn = async () => {
      if (!userImage || !selectedProduct.image) {
        alert('Please upload your photo and select a product');
        return;
      }
    
      setIsLoading(true);
    
      try {
        // Simple client-side image overlay
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Load both images
        const humanImg = new Image();
        const garmentImg = new Image();
    
        // Create a promise to handle image loading
        const loadImages = new Promise((resolve) => {
          let loadedImages = 0;
          const onLoad = () => {
            loadedImages++;
            if (loadedImages === 2) resolve();
          };
    
          humanImg.onload = onLoad;
          garmentImg.onload = onLoad;
    
          humanImg.src = userImage;
          garmentImg.src = selectedProduct.image;
        });
    
        await loadImages;
    
        // Set canvas size to match human image
        canvas.width = humanImg.width;
        canvas.height = humanImg.height;
    
        // Draw human image
        ctx.drawImage(humanImg, 0, 0);
    
        // Draw garment image with some transparency
        ctx.globalAlpha = 0.8;
        ctx.drawImage(garmentImg, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
    
        // Convert canvas to data URL
        const resultImageUrl = canvas.toDataURL('image/jpeg');
        setTryOnResult(resultImageUrl);
    
      } catch (error) {
        console.error('Try-on error:', error);
        alert('Error processing images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <GameShopContainer>
        <ShopTitle>{shopData.name}</ShopTitle>
        <ShopContent>
          <Sidebar>
            <SectionTitle>Categories</SectionTitle>
            <CategoryList>
              <CategoryItem 
                onClick={() => setSelectedCategory('Trending')}
                active={selectedCategory === 'Trending'}
              >
                Trending
              </CategoryItem>
              {Object.keys(shopData.categories).map((category) => (
                <CategoryItem 
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  active={selectedCategory === category}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>
          </Sidebar>
          {selectedProduct ? (
            <ProductViewContainer>
              <BackButton onClick={handleBackToHome}>← Back to Products</BackButton>
              <ProductViewHeader>
                <ProductViewImage>
                  <img src={selectedProduct.image} alt={selectedProduct.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </ProductViewImage>
                <ProductViewInfo>
                  <ProductViewTitle>{selectedProduct.name}</ProductViewTitle>
                  <ProductViewDescription>{selectedProduct.description}</ProductViewDescription>
                  <ProductViewDetails>
                    <ProductViewPrice>{selectedProduct.price}</ProductViewPrice>
                    <ProductViewUpvotes>
                      👍 {selectedProduct.upvotes} Upvotes
                    </ProductViewUpvotes>
                  </ProductViewDetails>
                  <BuyButton href={selectedProduct.buyLink} target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </BuyButton>
                  <TryOnButton onClick={handleTryOn}>Try On You</TryOnButton>
                </ProductViewInfo>
              </ProductViewHeader>
            </ProductViewContainer>
          ) : (
            <ProductGrid>
              {displayProducts.map((product) => (
                <ProductCard key={product.name} onClick={() => setSelectedProduct(product)}>
                  <ProductImage>
                    <img src={product.image} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  </ProductImage>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductCard>
              ))}
            </ProductGrid>
          )}
        </ShopContent>
        {showTryOn && (
          <TryOnModal>
            <TryOnContent>
              <TryOnTitle>Try On: {selectedProduct.name}</TryOnTitle>
              <TryOnImageContainer>
                <TryOnImage src={selectedProduct.image} alt={selectedProduct.name} />
                <TryOnImage src={userImage || 'D:\trys\tryfit\frontend\public\assets\building1.png'} alt="User" />
              </TryOnImageContainer>
              <UploadButton>
                Upload Your Photo
                <HiddenFileInput type="file" onChange={handleFileUpload} accept="image/*" />
              </UploadButton>
              <TryOnButton onClick={handleVirtualTryOn} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Let\'s Try On'}
              </TryOnButton>
              {isLoading && <LoadingSpinner />}
              {tryOnResult && (
                <TryOnImage src={tryOnResult} alt="Try-on Result" />
              )}
              <TryOnButton onClick={() => {
                setShowTryOn(false);
                setTryOnResult(null);
                setUserImage(null);
              }}>Close</TryOnButton>
            </TryOnContent>
          </TryOnModal>
        )}
        {/* Display the try-on result below the input images */}
        {tryOnResult && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>Your Try-On Result</h3>
            <img src={tryOnResult} alt="Try-On Result" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </GameShopContainer>
    );
  };
  
  export default GameShop;
  
