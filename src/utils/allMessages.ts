import { register } from "module";

const allMessages = {
    // Authentication Messages
    auth: {
      loginSuccess: "Login successful",
      registerSuccess: "Registration successful",
      loginFailed: "Invalid email or password",
      logoutSuccess: "Logged out successfully",
      accountCreated: "Account created successfully",
      emailVerified: "Email verified successfully",
      emailNotVerified: "Please verify your email first",
      passwordReset: "Password reset successfully",
      passwordResetLink: "Password reset link sent to your email",
      invalidToken: "Invalid or expired token",
      unauthorized: "Unauthorized access",
      accountBlocked: "Your account has been blocked",
      noToken: "No token provided",
      notFound: "User not found",
    },
  
    // Medicine Related Messages
    medicine: {
      created: "Medicine added successfully",
      updated: "Medicine updated successfully",
      deleted: "Medicine deleted successfully",
      notFound: "Medicine not found",
      outOfStock: "Medicine is out of stock",
      lowStock: "Medicine stock is running low",
      expired: "Medicine has expired",
      expiryWarning: "Medicine is near expiry date",
      invalidPrice: "Invalid medicine price",
      categoryNotFound: "Medicine category not found",
      requiresPrescription: "This medicine requires a prescription",
      dosageUpdated: "Medicine dosage information updated",
      compositionUpdated: "Medicine composition updated",
      genericAvailable: "Generic alternative available"
    },
  
    // Order Related Messages
    order: {
      created: "Order placed successfully",
      updated: "Order updated successfully",
      cancelled: "Order cancelled successfully",
      shipped: "Medicines have been shipped",
      delivered: "Medicines delivered successfully",
      failed: "Order processing failed",
      paymentPending: "Payment is pending",
      paymentSuccess: "Payment successful",
      paymentFailed: "Payment failed",
      refundInitiated: "Refund initiated",
      refundProcessed: "Refund processed successfully",
      prescriptionNeeded: "Prescription required for some medicines in your order"
    },
  
    // Cart Related Messages
    cart: {
      medicineAdded: "Medicine added to cart",
      medicineRemoved: "Medicine removed from cart",
      quantityUpdated: "Medicine quantity updated",
      cleared: "Cart cleared successfully",
      invalidQuantity: "Invalid quantity specified",
      maxLimitReached: "Maximum quantity limit reached for prescription medicine",
      prescriptionRequired: "Please upload prescription for restricted medicines"
    },
  
    // Prescription Related Messages
    prescription: {
      required: "Valid prescription is required for this medicine",
      uploaded: "Prescription uploaded successfully",
      invalid: "Invalid prescription format",
      expired: "Prescription has expired",
      verified: "Prescription verified successfully",
      rejected: "Prescription rejected",
      pendingVerification: "Prescription is under verification",
      doctorDetails: "Please provide doctor's details",
      dateRequired: "Prescription date required",
      needsClarification: "Prescription needs clarification"
    },
  
    // User Profile Messages
    profile: {
      updated: "Profile updated successfully",
      deleted: "Profile deleted successfully",
      addressAdded: "Delivery address added successfully",
      addressUpdated: "Delivery address updated successfully",
      addressDeleted: "Delivery address deleted successfully",
      healthInfoUpdated: "Health information updated successfully",
      allergyInfoUpdated: "Allergy information updated successfully"
    },
  
    // Validation Messages
    validation: {
      required: "This field is required",
      invalidEmail: "Invalid email format",
      invalidPhone: "Invalid phone number",
      invalidPincode: "Invalid pincode",
      passwordMismatch: "Passwords do not match",
      weakPassword: "Password must be at least 8 characters long",
      invalidDosage: "Invalid dosage format",
      invalidQuantity: "Invalid medicine quantity"
    },
    product:{
      created: "Product added successfully",
      updated: "Product updated successfully",
      deleted: "Product deleted successfully",
      notFound: "Product not found",
      outOfStock: "Product is out of stock",
      lowStock: "Product stock is running low",
      expired: "Product has expired",
      addProductError: "Error adding product",
      expiryWarning: "Product is near expiry date",
      invalidPrice: "Invalid product price",
      categoryNotFound: "Product category not found",
      requiresPrescription: "This product requires a prescription",
      dosageUpdated: "Product dosage information updated",
      compositionUpdated: "Product composition updated",
      genericAvailable: "Generic alternative available"
    },

  
    // Error Messages
    error: {
      serverError: "Internal server error",
      networkError: "Network connection error",
      databaseError: "Database operation failed",
      invalidRequest: "Invalid request",
      notFound: "Resource not found",
      alreadyExists: "Resource already exists",
      prescriptionRequired: "Prescription is mandatory for this purchase"
    },
  
    // Success Messages
    success: {
      created: "Created successfully",
      updated: "Updated successfully",
      deleted: "Deleted successfully"
    },
  
    // Notification Messages
    notification: {
      orderConfirmed: "Your medicine order has been confirmed",
      shipped: "Your medicines have been shipped",
      delivered: "Your medicines have been delivered",
      reminderMedicine: "Time to take your medicine",
      reorderReminder: "Time to reorder your medicines",
      offerAlert: "New offers available on your prescribed medicines",
      stockAlert: "Your regular medicine is back in stock",
      expiryAlert: "Some medicines in your order will expire soon",
      prescriptionExpiring: "Your saved prescription is about to expire",
      refillReminder: "Time for medicine refill"
    }
  };
  
  export default allMessages;