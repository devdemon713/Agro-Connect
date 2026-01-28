import React from 'react';
import { ShoppingCart, Tag, Package } from 'lucide-react';

const ProductCard = ({ product, onAction, isAdmin = false }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-sm">
            {product.category || 'Fresh'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight">{product.name}</h3>
          <div className="flex items-center text-slate-400 gap-1">
             <Package size={12} />
             <span className="text-[10px] font-medium">{product.stock}kg</span>
          </div>
        </div>
        
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 h-8 leading-relaxed">
          {product.description}
        </p>

        {/* Footer / Action Area */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Price</p>
            <p className="text-xl font-black text-slate-900">
              ₹{product.price}<span className="text-[10px] font-medium text-slate-400">/kg</span>
            </p>
          </div>

          <button
            onClick={() => onAction(product._id, product.price)}
            className={`flex items-center gap-2 font-bold text-sm px-4 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm
              ${isAdmin 
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'
              }`}
          >
            {isAdmin ? (
              'Manage'
            ) : (
              <>
                <ShoppingCart size={16} /> 
                <span>Buy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;