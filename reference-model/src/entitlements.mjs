/**
 * Sanitized reference model. Not production source.
 */
export function resolveAccess({ authenticated, subscriptionStatus, resource, promotion, now }) {
  if (resource?.access === 'free') {
    return { allowed: true, reason: 'free-content', action: 'open' };
  }

  const currentTime = new Date(now).getTime();
  const promoActive = Boolean(
    promotion?.startsAt &&
      promotion?.endsAt &&
      currentTime >= new Date(promotion.startsAt).getTime() &&
      currentTime < new Date(promotion.endsAt).getTime()
  );

  if (promoActive && promotion.resourceId === resource?.id) {
    return { allowed: true, reason: 'temporary-access', action: 'open' };
  }

  if (!authenticated) {
    return { allowed: false, reason: 'sign-in-required', action: 'sign-in' };
  }

  if (subscriptionStatus === 'active' || subscriptionStatus === 'grace-period') {
    return { allowed: true, reason: 'active-subscription', action: 'open' };
  }

  if (subscriptionStatus === 'expired') {
    return { allowed: false, reason: 'subscription-expired', action: 'renew' };
  }

  return { allowed: false, reason: 'subscription-required', action: 'upgrade' };
}
