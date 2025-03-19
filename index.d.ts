declare module "3d-bullet-raub" {
	type TBullet = typeof import('bullet-raub');
	type TThree = typeof import('three');
	type Object3D = typeof import('three').Object3D;
	type TScene3D = import('three').Scene;
	type Scene = typeof import('bullet-raub').Scene;
	type Body = typeof import('bullet-raub').Body;
	type TOptsBody = import('bullet-raub').TOptsBody;
	
	type TSceneInstance = InstanceType<Scene>;
	type TBodyInstance = InstanceType<Body>;
	
	export type TOptsShape = Omit<TOptsBody, 'scene'> & Readonly<{
		/**
		 * Bullet Physics scene where to insert bodies.
		 *
		 * This is only necessary if you want to use a custom scene, instead of the one
		 * provided by this module.
		*/
		sceneBullet?: TSceneInstance;
		/**
		 * Three.js scene where to insert debug meshes.
		 *
		 * This is only necessary if you want to use debug meshes.
		*/
		sceneThree?: TScene3D;
		/**
		 * Three.js object to attach.
		*/
		mesh?: Object3D;
		/**
		 * Debug mesh style. Default is `null` - OFF.
		*/
		debug?: null | 'solid' | 'wire';
		/**
		 * Debug mesh color.
		*/
		color?: null | number | string;
	}>;
	
	type TShapeInstance = TBodyInstance & {
		/**
		 * Three.js object to attach.
		*/
		mesh: Object3D;
		/**
		 * Debug mesh style. Default is `null` - OFF.
		*/
		debug: 'solid' | 'wire' | null;
	};
	
	interface TNewableShape extends Body {
		new(opts: TOptsShape): TShapeInstance;
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
	
	type TInitOpts = Readonly<{
		three?: TThree | null,
	}>;
	
	/**
	 * Initialize Bullet3D.
	 * 
	 * This function can be called repeatedly, but will ignore further calls.
	 * The return value is cached and will be returned immediately for repeating calls.
	 */
	export const init: (opts?: TInitOpts) => TBullet3D;
}
