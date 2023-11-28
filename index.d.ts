declare module "3d-bullet-raub" {
	type TBullet = typeof import('bullet-raub');
	type TThree = typeof import('three');
	type Object3D = typeof import('three').Object3D;
	type Scene = typeof import('bullet-raub').Scene;
	type Body = typeof import('bullet-raub').Body;
	type TOptsBody = import('bullet-raub').TOptsBody;
	
	type TSceneInstance = InstanceType<Scene>;
	type TBodyInstance = InstanceType<Body>;
	
	export type TOptsShape = Omit<TOptsBody, 'scene'> & Readonly<{
		scene?: TSceneInstance;
		mesh: Object3D;
	}>;
	
	type TShapeInstance = TBodyInstance & {
		/**
		 * Three.js object to attach.
		*/
		mesh: Object3D;
	};
	
	interface TNewableShape extends Body {
		new(opts: TOptsBody): TShapeInstance;
	}
	
	type TBullet3D = TBullet & {
		/**
		 * Default scene.
		*/
		scene: TSceneInstance;
		/**
		 * Physics driven object.
		*/
		Shape: TNewableShape,
	};
	
	/**
	 * Initialize Bullet3D.
	 * 
	 * This function can be called repeatedly, but will ignore further calls.
	 * The return value is cached and will be returned immediately for repeating calls.
	 */
	export const init: () => TBullet3D;
}
