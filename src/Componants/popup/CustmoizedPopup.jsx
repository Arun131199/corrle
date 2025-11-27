import { useEffect, useRef, useState } from "react";

export default function CustomizedPopup({
  title,
  subTitle,
  icon,
  showCancelButton = true,
  showConfirmButton = true,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isOpen = false,
  overlayClose = true,
  confirmButtonStyle = "primary",
  cancelButtonStyle = "secondary",
  children,
  type = "info",
  autoClose = false,
  autoCloseTime = 3000,
  showCloseButton = true,
  size = "md",
  position = "center",
  animation = "scale", // 'scale', 'slide', 'fade', 'bounce'
  blurBackground = true,
  showProgress = true,
  customIcon = null,
  footer,
  header,
  className = "",
  closeOnConfirm = true,
  confirmButtonDisabled = false,
  cancelButtonDisabled = false,
  theme = "light" // 'light', 'dark', 'auto'
}) {
  const popupRef = useRef(null);
  const autoCloseTimerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Theme configuration
  const getThemeClasses = () => {
    const themes = {
      light: {
        bg: "bg-white",
        text: "text-gray-800",
        overlay: "bg-black/50 bg-opacity-50",
        border: "border-gray-200"
      },
      dark: {
        bg: "bg-gray-900",
        text: "text-white",
        overlay: "bg-black/50 bg-opacity-70",
        border: "border-gray-700"
      },
      auto: {
        bg: "bg-white dark:bg-gray-900",
        text: "text-gray-800 dark:text-white",
        overlay: "bg-black/50 bg-opacity-50 dark:bg-opacity-70",
        border: "border-gray-200 dark:border-gray-700"
      }
    };
    return themes[theme] || themes.light;
  };

  const themeClasses = getThemeClasses();

  // Enhanced type configurations with animations
  const getTypeConfig = (type) => {
    const configs = {
      success: {
        icon: "✅",
        animatedIcon: "🎯",
        color: "emerald",
        gradient: "from-emerald-400 to-emerald-500",
        lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
        border: "border-emerald-200 dark:border-emerald-800",
        iconBg: "bg-emerald-100 dark:bg-emerald-800",
        text: "text-emerald-800 dark:text-emerald-200",
        ring: "ring-emerald-500",
        pulse: "animate-pulse"
      },
      danger: {
        icon: "❌",
        animatedIcon: "💥",
        color: "rose",
        gradient: "from-rose-400 to-rose-500",
        lightBg: "bg-rose-50 dark:bg-rose-900/20",
        border: "border-rose-200 dark:border-rose-800",
        iconBg: "bg-rose-100 dark:bg-rose-800",
        text: "text-rose-800 dark:text-rose-200",
        ring: "ring-rose-500",
        pulse: "animate-pulse"
      },
      warning: {
        icon: "⚠️",
        animatedIcon: "🔥",
        color: "amber",
        gradient: "from-amber-400 to-amber-500",
        lightBg: "bg-amber-50 dark:bg-amber-900/20",
        border: "border-amber-200 dark:border-amber-800",
        iconBg: "bg-amber-100 dark:bg-amber-800",
        text: "text-amber-800 dark:text-amber-200",
        ring: "ring-amber-500",
        pulse: "animate-bounce"
      },
      info: {
        icon: "ℹ️",
        animatedIcon: "💡",
        color: "blue",
        gradient: "from-blue-400 to-blue-500",
        lightBg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-100 dark:bg-blue-800",
        text: "text-blue-800 dark:text-blue-200",
        ring: "ring-blue-500",
        pulse: "animate-pulse"
      }
    };
    return configs[type] || configs.info;
  };

  const typeConfig = getTypeConfig(type);

  // Enhanced size classes
  const getSizeClasses = () => {
    const sizes = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-2xl",
      full: "max-w-4xl"
    };
    return sizes[size] || sizes.md;
  };

  // Enhanced position classes
  const getPositionClasses = () => {
    const positions = {
      center: "items-center justify-center",
      top: "items-start justify-center pt-10 md:pt-20",
      bottom: "items-end justify-center pb-10 md:pb-20",
      "top-right": "items-start justify-end pt-10 md:pt-20 pr-4 md:pr-10",
      "top-left": "items-start justify-start pt-10 md:pt-20 pl-4 md:pl-10"
    };
    return positions[position] || positions.center;
  };

  // Enhanced animation classes
  const getAnimationClasses = () => {
    const animations = {
      scale: "transform transition-all duration-300",
      slide: "transform transition-all duration-500",
      fade: "transition-opacity duration-300",
      bounce: "transform transition-all duration-500"
    };

    const enterAnimations = {
      scale: isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
      slide: isVisible ? "translate-y-0 opacity-100" : position.includes('top') ? "-translate-y-10 opacity-0" : "translate-y-10 opacity-0",
      fade: isVisible ? "opacity-100" : "opacity-0",
      bounce: isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
    };

    return `${animations[animation]} ${enterAnimations[animation]}`;
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onCancel?.();
      }
    };

    const handleClickOutside = (e) => {
      if (overlayClose && popupRef.current && !popupRef.current.contains(e.target)) {
        onCancel?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";

      // Auto close functionality with progress
      if (autoClose && onCancel) {
        const intervalTime = 50;
        const steps = autoCloseTime / intervalTime;
        const decrement = 100 / steps;

        autoCloseTimerRef.current = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev - decrement;
            if (newProgress <= 0) {
              clearInterval(autoCloseTimerRef.current);
              onCancel();
              return 0;
            }
            return newProgress;
          });
        }, intervalTime);
      }
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";

      if (autoCloseTimerRef.current) {
        clearInterval(autoCloseTimerRef.current);
      }
    };
  }, [isOpen, overlayClose, onCancel, autoClose, autoCloseTime]);

  const getButtonStyles = (buttonType) => {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const styles = {
      primary: `${baseStyles} bg-gradient-to-r ${typeConfig.gradient} text-white hover:shadow-xl focus:ring-${typeConfig.color}-500 shadow-lg hover:shadow-${typeConfig.color}-200`,
      secondary: `${baseStyles} bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500`,
      danger: `${baseStyles} bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 focus:ring-rose-500 shadow-lg`,
      success: `${baseStyles} bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-500 shadow-lg`,
      outline: `${baseStyles} border-2 border-${typeConfig.color}-500 text-${typeConfig.color}-600 dark:text-${typeConfig.color}-400 hover:bg-${typeConfig.color}-50 dark:hover:bg-${typeConfig.color}-900/30 focus:ring-${typeConfig.color}-500`,
      ghost: `${baseStyles} text-${typeConfig.color}-600 dark:text-${typeConfig.color}-400 hover:bg-${typeConfig.color}-50 dark:hover:bg-${typeConfig.color}-900/30 focus:ring-${typeConfig.color}-500`
    };

    return styles[buttonType] || styles.primary;
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (closeOnConfirm) {
      setIsVisible(false);
      setTimeout(() => onCancel?.(), 300);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onCancel?.(), 300);
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex ${getPositionClasses()} p-4`}>
      {/* Enhanced Overlay */}
      <div 
        className={`absolute inset-0 ${themeClasses.overlay} ${blurBackground ? 'backdrop-blur-md' : ''} transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={overlayClose ? handleCancel : undefined}
      />

      {/* Enhanced Popup Container */}
      <div
        ref={popupRef}
        className={`relative ${themeClasses.bg} rounded-3xl shadow-2xl w-full ${getSizeClasses()} ${getAnimationClasses()} border ${themeClasses.border} ${className}`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Progress Bar */}
        {autoClose && showProgress && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-t-3xl">
            <div 
              className={`h-full bg-gradient-to-r ${typeConfig.gradient} rounded-t-3xl transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Custom Header */}
        {header && (
          <div className={`p-6 border-b ${themeClasses.border}`}>
            {header}
          </div>
        )}

        {/* Enhanced Header with type styling */}
        {!header && (title || subTitle || icon) && (
          <div className={`${typeConfig.lightBg} ${themeClasses.border} rounded-t-3xl p-6 border-b`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Animated Icon */}
                <div className={`p-3 rounded-2xl ${typeConfig.iconBg} ${typeConfig.pulse} transition-all duration-300`}>
                  <div className="text-2xl">
                    {customIcon || icon || typeConfig.animatedIcon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  {title && (
                    <h2 className={`text-2xl font-bold ${typeConfig.text} ${themeClasses.text} mb-2 leading-tight`}>
                      {title}
                    </h2>
                  )}
                  {/* Subtitle */}
                  {subTitle && (
                    <p className={`${themeClasses.text} opacity-80 leading-relaxed`}>
                      {subTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Enhanced Close Button */}
              {showCloseButton && (
                <button
                  onClick={handleCancel}
                  className={`p-2 rounded-xl hover:bg-${typeConfig.color}-100 dark:hover:bg-${typeConfig.color}-800 ${typeConfig.text} hover:text-${typeConfig.color}-900 dark:hover:text-${typeConfig.color}-100 transition-all duration-200 transform hover:scale-110 active:scale-95 ml-2`}
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Custom Children Content */}
          {children && (
            <div className="mb-6">
              {children}
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className={`flex gap-3 ${showCancelButton && showConfirmButton ? 'justify-end' : 'justify-center'} flex-wrap`}>
            {/* Cancel Button */}
            {showCancelButton && (
              <button
                onClick={handleCancel}
                disabled={cancelButtonDisabled}
                className={getButtonStyles(cancelButtonStyle)}
              >
                {cancelText}
              </button>
            )}

            {/* Confirm Button */}
            {showConfirmButton && (
              <button
                onClick={handleConfirm}
                disabled={confirmButtonDisabled}
                className={getButtonStyles(confirmButtonStyle)}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>

        {/* Custom Footer */}
        {footer && (
          <div className={`p-6 border-t ${themeClasses.border} rounded-b-3xl`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}