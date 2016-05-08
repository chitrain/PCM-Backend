/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

/**
 * make status number->string
 * @param status {Number}
 * @return {String} represents what status means
 */
export const extractStatus = (status) => return (['等待', '通过', '拒绝'])[status]